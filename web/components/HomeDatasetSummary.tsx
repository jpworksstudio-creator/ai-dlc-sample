"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatImportedDate,
  getDatasetSummary,
} from "@/lib/services/dataset-summary";
import type { DatasetSummary } from "@/lib/types";

const EMPTY_SUMMARY: DatasetSummary = {
  isEmpty: true,
  transactionCount: 0,
  importedAt: null,
  sourceApp: null,
};

export function HomeDatasetSummary() {
  const [summary, setSummary] = useState<DatasetSummary>(EMPTY_SUMMARY);

  useEffect(() => {
    setSummary(getDatasetSummary());
  }, []);

  if (summary.isEmpty) {
    return (
      <>
        <section
          aria-label="データ状態"
          className="rounded-lg border border-amber-200 bg-amber-50 p-4"
        >
          <p className="text-sm font-medium text-amber-800">データ未取り込み</p>
          <p className="mt-2 text-sm text-gray-700">
            家計データがありません。まずデータを取り込んでください。
          </p>
        </section>

        <section className="space-y-3">
          <Link
            href="/import"
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            データを取り込む
          </Link>
          <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-400">
            AI に相談する（取り込み後に利用可能）
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <section
        aria-label="データ状態"
        className="rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p className="text-sm font-medium text-green-800">データ取り込み済み</p>
        <p className="mt-2 text-sm text-gray-700">
          取引データ: <strong>{summary.transactionCount}件</strong>
        </p>
        {summary.importedAt && (
          <p className="mt-1 text-sm text-gray-700">
            最終取り込み:{" "}
            <strong>{formatImportedDate(summary.importedAt)}</strong>
          </p>
        )}
      </section>

      <section className="space-y-3">
        <Link
          href="/import"
          className="flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900"
        >
          データを取り込む
        </Link>
        <Link
          href="/chat"
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          AI に相談する
        </Link>
      </section>
    </>
  );
}
