import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";
import type { TransactionSummary } from "@/lib/ai/transaction-summarizer";

const sampleSummary: TransactionSummary = {
  totalCount: 2,
  categoryTotals: { 食費: 1200, 日用品: 800 },
  samples: [
    {
      date: "2026-06-01",
      amount: 1200,
      category: "食費",
      description: "スーパー",
    },
  ],
};

afterEach(() => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_MODEL;
  delete process.env.GEMINI_TIMEOUT_MS;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/chat", () => {
  it("rejects empty questions", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "   ", summary: sampleSummary }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/質問/);
  });

  it("returns 503 when GEMINI_API_KEY is missing", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "先月の食費はいくら？",
        summary: sampleSummary,
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.error).toMatch(/GEMINI_API_KEY/);
  });

  it("returns mock structured response when GEMINI_API_KEY=mock", async () => {
    process.env.GEMINI_API_KEY = "mock";

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "先月の食費はいくら？",
        summary: sampleSummary,
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.response.summary).toContain("モック回答");
    expect(body.response.improvements.length).toBeGreaterThanOrEqual(1);
    expect(body.response.positives.length).toBeGreaterThanOrEqual(1);
    expect(body.response.categoryAmounts.食費).toBe(1200);
  });

  it("calls Gemini and returns parsed structured response", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GEMINI_MODEL = "gemini-2.5-flash";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    summary: "食費は1200円です。",
                    improvements: ["外食を週1回減らす"],
                    positives: ["日用品の支出が抑えられている"],
                    categoryAmounts: { 食費: 1200 },
                  }),
                },
              ],
            },
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "先月の食費はいくら？",
        summary: sampleSummary,
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.response.summary).toContain("1200");
    expect(body.response.improvements).toHaveLength(1);
    expect(body.response.positives).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("gemini-2.5-flash:generateContent");
    expect(init.headers).toMatchObject({
      "x-goog-api-key": "test-key",
    });
  });
});
