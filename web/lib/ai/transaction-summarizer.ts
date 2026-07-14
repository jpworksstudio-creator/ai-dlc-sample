import type { Transaction } from "@/lib/types";

export type TransactionSample = {
  date: string;
  amount: number;
  category: string;
  description: string;
};

export type TransactionSummary = {
  totalCount: number;
  categoryTotals: Record<string, number>;
  samples: TransactionSample[];
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  食費: ["食費", "食料", "外食", "ランチ"],
  日用品: ["日用品", "おむつ", "洗剤"],
  固定費: ["固定費", "光熱", "通信", "家賃", "保険"],
};

const MAX_SAMPLES = 8;

function detectFocusCategories(question: string): string[] {
  const focused: string[] = [];
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => question.includes(keyword))) {
      focused.push(category);
    }
  }
  return focused;
}

/**
 * 質問に関連する取引の集計・代表明細を作る（Bプラン: 要約のみを AI に送る）。
 */
export function summarizeTransactions(
  transactions: Transaction[],
  question = "",
): TransactionSummary {
  const focusCategories = detectFocusCategories(question);
  const scoped =
    focusCategories.length > 0
      ? transactions.filter((tx) => focusCategories.includes(tx.category))
      : transactions;

  const categoryTotals: Record<string, number> = {};
  for (const tx of scoped) {
    categoryTotals[tx.category] = (categoryTotals[tx.category] ?? 0) + tx.amount;
  }

  const samples = [...scoped]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_SAMPLES)
    .map((tx) => ({
      date: tx.date,
      amount: tx.amount,
      category: tx.category,
      description: tx.description,
    }));

  return {
    totalCount: scoped.length,
    categoryTotals,
    samples,
  };
}
