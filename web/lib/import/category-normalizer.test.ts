import { describe, expect, it } from "vitest";
import { normalizeCategory } from "@/lib/import/category-normalizer";

describe("normalizeCategory", () => {
  it("maps known Zaim categories to normalized buckets", () => {
    expect(normalizeCategory("食費")).toBe("食費");
    expect(normalizeCategory("外食")).toBe("食費");
    expect(normalizeCategory("日用品")).toBe("日用品");
    expect(normalizeCategory("ベビー・キッズ")).toBe("日用品");
    expect(normalizeCategory("水道・光熱費")).toBe("固定費");
    expect(normalizeCategory("通信費")).toBe("固定費");
  });

  it("falls back to その他 for unknown or empty values", () => {
    expect(normalizeCategory("交通")).toBe("その他");
    expect(normalizeCategory("")).toBe("その他");
    expect(normalizeCategory("  ")).toBe("その他");
  });
});
