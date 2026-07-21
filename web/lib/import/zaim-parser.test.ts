import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { decodeCsvBytes, parseZaimCsv } from "@/lib/import/zaim-parser";

const fixturePath = path.resolve(__dirname, "../../fixtures/zaim-sample.csv");
const sampleCsv = readFileSync(fixturePath, "utf-8");

describe("parseZaimCsv", () => {
  it("parses official Zaim CSV and normalizes categories", () => {
    const result = parseZaimCsv(sampleCsv);

    expect(result.success).toBe(true);
    if (!result.success) return;

    // income row skipped → 7 expense rows
    expect(result.transactionCount).toBe(7);
    expect(result.dataset.sourceApp).toBe("zaim");
    expect(result.transactions.map((t) => t.category)).toEqual([
      "食費",
      "日用品",
      "固定費",
      "食費",
      "日用品",
      "その他",
      "その他",
    ]);
    expect(result.transactions.every((t) => t.amount > 0)).toBe(true);
    // empty 品目 falls back to カテゴリの内訳
    expect(result.transactions[6]?.description).toBe("ガソリン");
  });

  it("returns validation error when required columns are missing", () => {
    const result = parseZaimCsv("foo,bar\n1,2\n");

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors[0]).toMatch(/必須列/);
  });

  it("still parses legacy fixture columns (金額 / 内容)", () => {
    const legacy = [
      "日付,方法,カテゴリ,ジャンル,金額,収入／支払,内容,メモ",
      "2026-06-01,現金,食費,食料品,1200,payment,スーパーA,",
      "2026-06-10,振込,給料,給与,300000,income,給料,",
    ].join("\n");

    const result = parseZaimCsv(legacy);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.transactionCount).toBe(1);
    expect(result.transactions[0]?.description).toBe("スーパーA");
  });
});

describe("decodeCsvBytes", () => {
  it("accepts UTF-8 official headers", () => {
    const bytes = new TextEncoder().encode(sampleCsv);
    const text = decodeCsvBytes(bytes);
    expect(text).toContain("日付");
    expect(text).toContain("支出");
  });

  it("decodes Shift_JIS bytes when UTF-8 mojibake fails header check", () => {
    // Minimal Shift_JIS for: 日付,支出\n2026-01-01,100
    // Precomputed CP932 bytes for header "日付,支出"
    const headerSjis = Uint8Array.from([
      0x93, 0xfa, 0x95, 0x74, 0x2c, 0x8e, 0x78, 0x8f, 0x6f, 0x0a, 0x32, 0x30,
      0x32, 0x36, 0x2d, 0x30, 0x31, 0x2d, 0x30, 0x31, 0x2c, 0x31, 0x30, 0x30,
    ]);
    const text = decodeCsvBytes(headerSjis);
    expect(text).toContain("日付");
    expect(text).toContain("支出");
  });
});
