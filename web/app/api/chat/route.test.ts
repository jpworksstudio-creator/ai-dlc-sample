import { afterEach, describe, expect, it } from "vitest";
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
  delete process.env.OPENAI_API_KEY;
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

  it("returns mock structured response when OPENAI_API_KEY=mock", async () => {
    process.env.OPENAI_API_KEY = "mock";

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
});
