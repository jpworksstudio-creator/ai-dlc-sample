export type NormalizedCategory = "食費" | "日用品" | "固定費" | "その他";

const FOOD_CATEGORIES = new Set([
  "食費",
  "食料品",
  "外食",
  "カフェ",
  "カフェ・スイーツ",
  "酒類",
]);

const DAILY_CATEGORIES = new Set([
  "日用品",
  "洗剤・ティッシュ",
  "ベビー・キッズ",
  "子育て",
  "化粧品",
]);

const FIXED_CATEGORIES = new Set([
  "水道・光熱費",
  "光熱費",
  "通信費",
  "住居",
  "家賃",
  "住宅",
  "保険",
  "固定費",
]);

/**
 * Zaim のカテゴリ（またはジャンル）名を正規化カテゴリへ変換する。
 * 未定義の名称は「その他」。
 */
export function normalizeCategory(rawCategory: string): NormalizedCategory {
  const trimmed = rawCategory.trim();
  if (!trimmed) return "その他";
  if (FOOD_CATEGORIES.has(trimmed)) return "食費";
  if (DAILY_CATEGORIES.has(trimmed)) return "日用品";
  if (FIXED_CATEGORIES.has(trimmed)) return "固定費";
  return "その他";
}
