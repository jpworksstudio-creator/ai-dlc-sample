import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  createMockStructuredResponse,
  parseStructuredResponse,
  type StructuredAgentResponse,
} from "@/lib/ai/structured-response";
import type { TransactionSummary } from "@/lib/ai/transaction-summarizer";

const MAX_QUESTION_LENGTH = 500;
const DEFAULT_MODEL = "gpt-5.4-mini";
const DEFAULT_TIMEOUT_MS = 30000;

type ChatRequestBody = {
  question?: unknown;
  summary?: unknown;
};

function isTransactionSummary(value: unknown): value is TransactionSummary {
  if (!value || typeof value !== "object") return false;
  const summary = value as Record<string, unknown>;
  return (
    typeof summary.totalCount === "number" &&
    typeof summary.categoryTotals === "object" &&
    summary.categoryTotals !== null &&
    Array.isArray(summary.samples)
  );
}

function sanitizeQuestion(raw: string): string {
  return raw.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json(
      { error: "リクエスト本文が不正です" },
      { status: 400 },
    );
  }

  if (typeof body.question !== "string") {
    return NextResponse.json(
      { error: "質問を入力してください" },
      { status: 400 },
    );
  }

  const question = sanitizeQuestion(body.question);
  if (!question) {
    return NextResponse.json(
      { error: "質問を入力してください" },
      { status: 400 },
    );
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `質問は${MAX_QUESTION_LENGTH}文字以内にしてください` },
      { status: 400 },
    );
  }

  if (!isTransactionSummary(body.summary)) {
    return NextResponse.json(
      { error: "取引要約が不正です" },
      { status: 400 },
    );
  }

  const summary = body.summary;
  const apiKey = process.env.OPENAI_API_KEY?.trim() ?? "";

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY が設定されていません" },
      { status: 503 },
    );
  }

  if (apiKey === "mock") {
    const mock = createMockStructuredResponse(question, summary);
    return NextResponse.json({ response: mock } satisfies {
      response: StructuredAgentResponse;
    });
  }

  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
  const timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  const client = new OpenAI({ apiKey, timeout: timeoutMs });

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "あなたは家計相談アシスタントです。",
            "ユーザーの質問と取引要約だけを根拠に、日本語の JSON で回答してください。",
            '必須キー: summary(string), improvements(string[]), positives(string[])。',
            "improvements と positives は各1件以上。",
            "任意キー: categoryAmounts(object), transactions(array).",
            "推測で実在しない金額を作らないでください。",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({ question, summary }),
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI 応答が空でした" },
        { status: 502 },
      );
    }

    const parsed = parseStructuredResponse(JSON.parse(content));
    return NextResponse.json({ response: parsed });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI 応答の取得に失敗しました";
    const isTimeout = /timeout|timed out/i.test(message);
    return NextResponse.json(
      {
        error: isTimeout
          ? "応答がタイムアウトしました。もう一度お試しください"
          : "応答を取得できませんでした。もう一度お試しください",
      },
      { status: isTimeout ? 504 : 502 },
    );
  }
}
