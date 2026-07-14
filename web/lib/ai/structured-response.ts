import type { TransactionSummary } from "@/lib/ai/transaction-summarizer";

export type StructuredAgentResponse = {
  summary: string;
  categoryAmounts?: Record<string, number>;
  transactions?: Array<{
    date: string;
    amount: number;
    category: string;
    description: string;
  }>;
  improvements: string[];
  positives: string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * OpenAI 応答 JSON を検証し、BR-9（改善案・良かった点を各1件以上）を満たす形へ正規化する。
 */
export function parseStructuredResponse(raw: unknown): StructuredAgentResponse {
  if (!raw || typeof raw !== "object") {
    throw new Error("応答形式が不正です");
  }

  const data = raw as Record<string, unknown>;
  const summary = typeof data.summary === "string" ? data.summary.trim() : "";
  const improvements = isStringArray(data.improvements)
    ? data.improvements.map((item) => item.trim()).filter(Boolean)
    : [];
  const positives = isStringArray(data.positives)
    ? data.positives.map((item) => item.trim()).filter(Boolean)
    : [];

  if (!summary) {
    throw new Error("応答に summary がありません");
  }
  if (improvements.length < 1 || positives.length < 1) {
    throw new Error("改善案と良かった点は各1件以上必要です");
  }

  const categoryAmounts =
    data.categoryAmounts && typeof data.categoryAmounts === "object"
      ? (data.categoryAmounts as Record<string, number>)
      : undefined;

  const transactions = Array.isArray(data.transactions)
    ? (data.transactions as StructuredAgentResponse["transactions"])
    : undefined;

  return {
    summary,
    categoryAmounts,
    transactions,
    improvements,
    positives,
  };
}

export function createMockStructuredResponse(
  question: string,
  summary: TransactionSummary,
): StructuredAgentResponse {
  const food = summary.categoryTotals["食費"] ?? 0;
  const daily = summary.categoryTotals["日用品"] ?? 0;
  const fixed = summary.categoryTotals["固定費"] ?? 0;

  return {
    summary: `「${question}」へのモック回答です。対象取引 ${summary.totalCount}件を集計しました。`,
    categoryAmounts: {
      食費: food,
      日用品: daily,
      固定費: fixed,
    },
    transactions: summary.samples.slice(0, 3),
    improvements: [
      "外食や衝動買いの頻度を見直し、週1回は自炊デーを設けると支出を抑えやすくなります。",
    ],
    positives: [
      "固定費や日用品の記録が揃っており、家計の見える化ができています。",
    ],
  };
}
