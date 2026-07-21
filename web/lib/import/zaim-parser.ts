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

const MAX_CSV_BYTES = 5 * 1024 * 1024;

type ZaimRow = Record<string, string>;

type ResolvedColumns = {
  date: string;
  category: string;
  /** Legacy single amount column: 金額 / 通貨金額 */
  amount: string | null;
  /** Official Zaim: 支出 */
  expense: string | null;
  /** Official Zaim: 収入 */
  income: string | null;
  description: string | null;
  method: string | null;
  genre: string | null;
  memo: string | null;
  shop: string | null;
  /** Legacy: 収入／支払 */
  incomePayment: string | null;
};

function findHeader(headers: string[], candidates: string[]): string | null {
  for (const candidate of candidates) {
    if (headers.includes(candidate)) return candidate;
  }
  return null;
}

function looksLikeZaimCsv(text: string): boolean {
  const header = (text.split(/\r?\n/)[0] ?? "").trim();
  if (!header.includes("日付")) return false;
  return (
    header.includes("支出") ||
    header.includes("金額") ||
    header.includes("通貨金額") ||
    header.includes("品目") ||
    header.includes("内容")
  );
}

/**
 * UTF-8 を試し、Zaim ヘッダーとして読めなければ Shift_JIS で再デコードする。
 */
export function decodeCsvBytes(bytes: Uint8Array): string {
  if (bytes.byteLength > MAX_CSV_BYTES) {
    throw new Error("CSV サイズが上限（5MB）を超えています");
  }

  const utf8 = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  if (looksLikeZaimCsv(utf8)) return utf8;

  const shiftJis = new TextDecoder("shift-jis", { fatal: false }).decode(bytes);
  if (looksLikeZaimCsv(shiftJis)) return shiftJis;

  // どちらでもヘッダー判定できない場合は UTF-8 を返し、後段で必須列エラーにする
  return utf8;
}

function resolveColumns(headers: string[]): ResolvedColumns | null {
  const date = findHeader(headers, ["日付"]);
  const category = findHeader(headers, ["カテゴリ"]);
  const amount = findHeader(headers, ["金額", "通貨金額"]);
  const expense = findHeader(headers, ["支出"]);
  const income = findHeader(headers, ["収入"]);
  const description = findHeader(headers, ["内容", "品目"]);
  const method = findHeader(headers, ["方法"]);
  const genre = findHeader(headers, ["カテゴリの内訳", "ジャンル"]);
  const memo = findHeader(headers, ["メモ"]);
  const shop = findHeader(headers, ["お店", "場所"]);
  const incomePayment = findHeader(headers, ["収入／支払", "収入/支出"]);

  if (!date || !category) return null;
  if (!amount && !expense) return null;

  return {
    date,
    category,
    amount,
    expense,
    income,
    description,
    method,
    genre,
    memo,
    shop,
    incomePayment,
  };
}

function parseAmount(raw: string): number | null {
  const normalized = raw.replace(/,/g, "").trim();
  if (!normalized) return null;
  // Premium placeholders
  if (normalized.includes("プレミアム")) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  return Math.abs(value);
}

function parseDate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const matched = trimmed.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (!matched) return null;
  const [, y, m, d] = matched;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function makeId(date: string, amount: number, description: string, row: number): string {
  return `zaim-${date}-${amount}-${row}-${description.slice(0, 24)}`;
}

function resolveDescription(row: ZaimRow, columns: ResolvedColumns, category: string): string {
  const candidates = [
    columns.description ? row[columns.description] : "",
    columns.genre ? row[columns.genre] : "",
    columns.memo ? row[columns.memo] : "",
    columns.shop ? row[columns.shop] : "",
    category,
  ];
  for (const candidate of candidates) {
    const value = (candidate ?? "").trim();
    if (!value || value === "-" || value.includes("プレミアム")) continue;
    return value;
  }
  return "（品目なし）";
}

function shouldSkipRow(row: ZaimRow, columns: ResolvedColumns): boolean {
  const method = columns.method ? (row[columns.method] ?? "").trim().toLowerCase() : "";
  if (method === "income" || method === "transfer" || method === "balance") {
    return true;
  }

  const incomePayment = columns.incomePayment
    ? (row[columns.incomePayment] ?? "").trim()
    : "";
  if (
    incomePayment === "income" ||
    incomePayment === "収入" ||
    incomePayment.toLowerCase() === "transfer"
  ) {
    return true;
  }

  // Official format: income-only rows (支出=0, 収入>0)
  if (!columns.amount && columns.expense) {
    const expense = parseAmount(row[columns.expense] ?? "") ?? 0;
    const income = columns.income
      ? (parseAmount(row[columns.income] ?? "") ?? 0)
      : 0;
    if (expense === 0 && income > 0) return true;
    if (expense === 0) return true;
  }

  return false;
}

function resolveRowAmount(row: ZaimRow, columns: ResolvedColumns): number | null {
  if (columns.amount) {
    return parseAmount(row[columns.amount] ?? "");
  }
  if (columns.expense) {
    return parseAmount(row[columns.expense] ?? "");
  }
  return null;
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
    transformHeader: (header) => header.trim().replace(/^\uFEFF/, ""),
  });

  if (parsed.errors.length > 0 && (!parsed.data || parsed.data.length === 0)) {
    return {
      success: false,
      transactionCount: 0,
      errors: ["CSV の形式が正しくありません"],
    };
  }

  const headers = (parsed.meta.fields ?? []).map((h) => h.trim());
  const columns = resolveColumns(headers);
  if (!columns) {
    return {
      success: false,
      transactionCount: 0,
      errors: [
        "必須列（日付・カテゴリ・支出または金額）が見つかりません。Zaim のエクスポート CSV を選択してください",
      ],
    };
  }

  const transactions: Transaction[] = [];
  const rowErrors: string[] = [];

  parsed.data.forEach((row, index) => {
    const sourceRow = index + 2;
    if (shouldSkipRow(row, columns)) return;

    const date = parseDate(row[columns.date] ?? "");
    const amount = resolveRowAmount(row, columns);
    const rawCategory = (row[columns.category] ?? "").trim();
    const rawDescription = resolveDescription(row, columns, rawCategory);

    if (!date || amount === null || amount === 0 || !rawCategory) {
      rowErrors.push(`行 ${sourceRow}: 必須項目が不足しています`);
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
