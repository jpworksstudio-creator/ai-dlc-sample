import { getDataset } from "@/lib/storage/local-storage-adapter";
import type { DatasetSummary } from "@/lib/types";

export function getDatasetSummary(): DatasetSummary {
  const dataset = getDataset();

  if (!dataset) {
    return {
      isEmpty: true,
      transactionCount: 0,
      importedAt: null,
      sourceApp: null,
    };
  }

  return {
    isEmpty: false,
    transactionCount: dataset.transactionCount,
    importedAt: dataset.importedAt,
    sourceApp: dataset.sourceApp,
  };
}

export function formatImportedDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("ja-JP");
}
