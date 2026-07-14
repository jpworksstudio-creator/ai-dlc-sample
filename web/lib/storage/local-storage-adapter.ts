import type { HouseholdDataset, Transaction } from "@/lib/types";
import { StorageQuotaError } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/storage/keys";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" || error.code === 22)
    ) {
      throw new StorageQuotaError();
    }
    throw error;
  }
}

export function getDataset(): HouseholdDataset | null {
  return readJson<HouseholdDataset>(STORAGE_KEYS.dataset);
}

export function getTransactions(): Transaction[] {
  return readJson<Transaction[]>(STORAGE_KEYS.transactions) ?? [];
}

export function saveHouseholdData(
  dataset: HouseholdDataset,
  transactions: Transaction[],
): void {
  writeJson(STORAGE_KEYS.dataset, dataset);
  writeJson(STORAGE_KEYS.transactions, transactions);
}

export function clearHouseholdData(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEYS.dataset);
  window.localStorage.removeItem(STORAGE_KEYS.transactions);
}

export function hasHouseholdData(): boolean {
  return getDataset() !== null;
}
