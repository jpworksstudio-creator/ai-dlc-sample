import { afterEach, describe, expect, it } from "vitest";
import { deleteAllHouseholdData } from "@/lib/storage/delete-all";
import {
  getDataset,
  getTransactions,
  saveHouseholdData,
} from "@/lib/storage/local-storage-adapter";
import type { HouseholdDataset, Transaction } from "@/lib/types";

const dataset: HouseholdDataset = {
  id: "dataset-1",
  sourceApp: "zaim",
  importedAt: "2026-07-01T00:00:00.000Z",
  transactionCount: 1,
};

const transactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2026-06-01",
    amount: 1000,
    category: "食費",
    description: "スーパー",
    rawDescription: "スーパー",
    sourceRow: 1,
  },
];

afterEach(() => {
  localStorage.clear();
});

describe("deleteAllHouseholdData", () => {
  it("removes dataset and transactions from localStorage", () => {
    saveHouseholdData(dataset, transactions);

    const result = deleteAllHouseholdData();

    expect(result.deleted).toBe(true);
    expect(result.hadData).toBe(true);
    expect(getDataset()).toBeNull();
    expect(getTransactions()).toEqual([]);
  });
});
