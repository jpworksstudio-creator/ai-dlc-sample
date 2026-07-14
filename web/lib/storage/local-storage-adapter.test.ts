import { afterEach, describe, expect, it } from "vitest";
import type { HouseholdDataset, Transaction } from "@/lib/types";
import { StorageQuotaError } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import {
  clearHouseholdData,
  getDataset,
  getTransactions,
  hasHouseholdData,
  saveHouseholdData,
} from "@/lib/storage/local-storage-adapter";

const sampleDataset: HouseholdDataset = {
  id: "dataset-1",
  sourceApp: "zaim",
  importedAt: "2026-07-01T00:00:00.000Z",
  transactionCount: 2,
};

const sampleTransactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2026-06-01",
    amount: 1200,
    category: "食費",
    description: "スーパー",
    rawDescription: "スーパー",
    sourceRow: 1,
  },
  {
    id: "tx-2",
    date: "2026-06-02",
    amount: 800,
    category: "日用品",
    description: "ドラッグストア",
    rawDescription: "ドラッグストア",
    sourceRow: 2,
  },
];

afterEach(() => {
  localStorage.clear();
});

describe("local-storage-adapter", () => {
  it("returns null when no dataset exists", () => {
    expect(getDataset()).toBeNull();
    expect(getTransactions()).toEqual([]);
    expect(hasHouseholdData()).toBe(false);
  });

  it("saves and reads household data", () => {
    saveHouseholdData(sampleDataset, sampleTransactions);

    expect(getDataset()).toEqual(sampleDataset);
    expect(getTransactions()).toEqual(sampleTransactions);
    expect(hasHouseholdData()).toBe(true);
  });

  it("clears household data", () => {
    saveHouseholdData(sampleDataset, sampleTransactions);
    clearHouseholdData();

    expect(getDataset()).toBeNull();
    expect(getTransactions()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEYS.dataset)).toBeNull();
  });

  it("throws StorageQuotaError when quota is exceeded", () => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function () {
      throw new DOMException("QuotaExceededError", "QuotaExceededError");
    };

    try {
      expect(() => saveHouseholdData(sampleDataset, sampleTransactions)).toThrow(
        StorageQuotaError,
      );
    } finally {
      Storage.prototype.setItem = originalSetItem;
    }
  });
});
