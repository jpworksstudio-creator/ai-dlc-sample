import Papa from "papaparse";
import { normalizeCategory } from "@/lib/import/category-normalizer";
import type { HouseholdDataset, Transaction } from "@/lib/types";

export type ZaimParseSuccess = {
  success: true;
  dataset: HouseholdDataset;
  transactions: Transaction[];
  transactionCount: number;
  errors: string[];
};

export type ZaimParseFailure = {
  success: false;
  transactionCount: 0;
  errors: string[];
};

export type ZaimParseResult = ZaimParseSuccess | ZaimParseFailure;

const REQUIRED_HEADERS = ["日付", "カテゴリ", "金額", "内容"] as const;

const MAX_CSV_BYTES = 5 * 1024 * 1024;

type ZaimRow = Record<string, string>;

function findHeader(headers: string[], candidates: string[]): string | null {
  for (const candidate of candidates) {
    if (headers.includes(candidate)) return candidate;
  }
  return null;
}

function resolveColumns(headers: string[]): {
  date: string;
  category: string;
  amount: string;
  description: string;
} | null {
  const date = findHeader(headers, ["日付"]);
  const category = findHeader(headers, ["カテゴリ"]);
  const amount = findHeader(headers, ["金額", "通貨金額"]);
  const description = findHeader(headers, ["内容", "品目"]);

  if (!date || !category || !amount || !description) return null;
  return { date, category, amount, description };
}

function parseAmount(raw: string): number | null {
  const normalized = raw.replace(/,/g, "").trim();
  if (!normalized) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  return Math.abs(value);
}

function parseDate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // Zaim: YYYY-MM-DD or YYYY/MM/DD
  const matched = trimmed.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (!matched) return null;
  const [, y, m, d] = matched;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function makeId(date: string, amount: number, description: string, row: number): string {
  return `zaim-${date}-${amount}-${row}-${description.slice(0, 24)}`;
}

export function parseZaimCsv(csvText: string): ZaimParseResult {
  if (new TextEncoder().encode(csvText).length > MAX_CSV_BYTES) {
    return {
      success: false,
      transactionCount: 0,
      errors: ["CSV サイズが上限（5MB）を超えています"],
    };
  }

  const parsed = Papa.parse<ZaimRow>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (parsed.errors.length > 0 && (!parsed.data || parsed.data.length === 0)) {
    return {
      success: false,
      transactionCount: 0,
      errors: ["CSV の形式が正しくありません"],
    };
  }

  const headers = parsed.meta.fields ?? [];
  const columns = resolveColumns(headers);
  if (!columns) {
    return {
      success: false,
      transactionCount: 0,
      errors: [
        `必須列（${REQUIRED_HEADERS.join("・")}）が見つかりません。Zaim のエクスポート CSV を選択してください`,
      ],
    };
  }

  const transactions: Transaction[] = [];
  const rowErrors: string[] = [];

  parsed.data.forEach((row, index) => {
    const sourceRow = index + 2; // header = row 1
    const date = parseDate(row[columns.date] ?? "");
    const amount = parseAmount(row[columns.amount] ?? "");
    const rawDescription = (row[columns.description] ?? "").trim();
    const rawCategory = (row[columns.category] ?? "").trim();

    if (!date || amount === null || !rawDescription || !rawCategory) {
      rowErrors.push(`行 ${sourceRow}: 必須項目が不足しています`);
      return;
    }

    const incomeFlag = (row["収入／支払"] ?? row["収入/支出"] ?? "").trim();
    // Skip income rows when the flag indicates income
    if (incomeFlag === "income" || incomeFlag === "収入") {
      return;
    }

    transactions.push({
      id: makeId(date, amount, rawDescription, sourceRow),
      date,
      amount,
      category: normalizeCategory(rawCategory),
      description: rawDescription,
      rawDescription,
      sourceRow,
    });
  });

  if (transactions.length === 0) {
    return {
      success: false,
      transactionCount: 0,
      errors:
        rowErrors.length > 0
          ? rowErrors.slice(0, 5)
          : ["取り込む支出取引がありません"],
    };
  }

  const dataset: HouseholdDataset = {
    id: `dataset-${Date.now()}`,
    sourceApp: "zaim",
    importedAt: new Date().toISOString(),
    transactionCount: transactions.length,
  };

  return {
    success: true,
    dataset,
    transactions,
    transactionCount: transactions.length,
    errors: rowErrors.slice(0, 5),
  };
}
