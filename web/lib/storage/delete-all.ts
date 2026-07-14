import { clearHouseholdData, hasHouseholdData } from "@/lib/storage/local-storage-adapter";

export type DeleteAllResult = {
  deleted: boolean;
  hadData: boolean;
};

/**
 * 確認ダイアログ承認後に呼ぶ。家計関連キーを localStorage から削除する（BR-10）。
 */
export function deleteAllHouseholdData(): DeleteAllResult {
  const hadData = hasHouseholdData();
  clearHouseholdData();
  return {
    deleted: true,
    hadData,
  };
}
