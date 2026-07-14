import { describe, expect, it } from "vitest";
import { summarizeTransactions } from "@/lib/ai/transaction-summarizer";
import type { Transaction } from "@/lib/types";

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2026-06-03",
    amount: 5400,
    category: "固定費",
    description: "電気代",
    rawDescription: "電気代",
    sourceRow: 1,
  },
  {
    id: "2",
    date: "2026-06-02",
    amount: 800,
    category: "日用品",
    description: "洗剤",
    rawDescription: "洗剤",
    sourceRow: 2,
  },
  {
    id: "3",
    date: "2026-06-01",
    amount: 1200,
    category: "食費",
    description: "スーパー",
    rawDescription: "スーパー",
    sourceRow: 3,
  },
];

describe("summarizeTransactions", () => {
  it("aggregates all categories when question has no focus", () => {
    const summary = summarizeTransactions(transactions, "先月の総支出は？");

    expect(summary.totalCount).toBe(3);
    expect(summary.categoryTotals).toEqual({
      固定費: 5400,
      日用品: 800,
      食費: 1200,
    });
    expect(summary.samples[0]?.date).toBe("2026-06-03");
  });

  it("filters to food category when question mentions 食費", () => {
    const summary = summarizeTransactions(transactions, "先月の食費はいくら？");

    expect(summary.totalCount).toBe(1);
    expect(summary.categoryTotals).toEqual({ 食費: 1200 });
    expect(summary.samples).toHaveLength(1);
    expect(summary.samples[0]?.description).toBe("スーパー");
  });
});
