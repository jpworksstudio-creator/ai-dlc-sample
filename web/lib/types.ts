export type SourceApp = "zaim" | "moneytree";

export type HouseholdDataset = {
  id: string;
  sourceApp: SourceApp;
  importedAt: string;
  transactionCount: number;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  rawDescription: string;
  sourceRow: number;
};

export type DatasetSummary = {
  isEmpty: boolean;
  transactionCount: number;
  importedAt: string | null;
  sourceApp: SourceApp | null;
};

export class StorageQuotaError extends Error {
  constructor(message = "localStorage の容量上限に達しました") {
    super(message);
    this.name = "StorageQuotaError";
  }
}
