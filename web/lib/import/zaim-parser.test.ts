import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseZaimCsv } from "@/lib/import/zaim-parser";

const fixturePath = path.resolve(__dirname, "../../fixtures/zaim-sample.csv");
const sampleCsv = readFileSync(fixturePath, "utf-8");

describe("parseZaimCsv", () => {
  it("parses sample CSV and normalizes categories", () => {
    const result = parseZaimCsv(sampleCsv);

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.transactionCount).toBe(6);
    expect(result.dataset.sourceApp).toBe("zaim");
    expect(result.transactions.map((t) => t.category)).toEqual([
      "食費",
      "日用品",
      "固定費",
      "食費",
      "日用品",
      "その他",
    ]);
    expect(result.transactions.every((t) => t.amount > 0)).toBe(true);
  });

  it("returns validation error when required columns are missing", () => {
    const result = parseZaimCsv("foo,bar\n1,2\n");

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors[0]).toMatch(/必須列/);
  });
});
