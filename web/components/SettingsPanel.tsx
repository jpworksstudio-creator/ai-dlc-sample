"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { deleteAllHouseholdData } from "@/lib/storage/delete-all";
import { getDatasetSummary } from "@/lib/services/dataset-summary";

export function SettingsPanel() {
  const [ready, setReady] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [hasData, setHasData] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const summary = getDatasetSummary();
    setTransactionCount(summary.transactionCount);
    setHasData(!summary.isEmpty);
    setReady(true);
  }, []);

  function handleConfirmDelete() {
    deleteAllHouseholdData();
    setConfirmOpen(false);
    setHasData(false);
    setTransactionCount(0);
    setDeleted(true);
  }

  if (!ready) {
    return <p className="text-sm text-gray-600">読み込み中…</p>;
  }

  if (deleted) {
    return (
      <section
        aria-label="削除完了"
        className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p className="text-sm font-medium text-green-800">家計データを削除しました。</p>
        <Link
          href="/"
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          ホームへ戻る
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="space-y-3 rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900">データ保存について</h3>
        <p className="text-sm text-gray-700">
          家計データはこの端末のブラウザ内にのみ保存されます。サーバーには送信しません。
        </p>
        <p className="text-sm text-gray-700">
          保存件数: <strong>{transactionCount}件</strong>
        </p>
      </section>

      <section className="space-y-3">
        <button
          type="button"
          disabled={!hasData}
          onClick={() => setConfirmOpen(true)}
          aria-label="家計データをすべて削除"
          className="flex min-h-11 w-full items-center justify-center rounded-lg border-2 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
        >
          家計データを削除
        </button>
        {!hasData && (
          <p className="text-sm text-gray-500">削除できるデータがありません。</p>
        )}
      </section>

      <DeleteConfirmDialog
        open={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
