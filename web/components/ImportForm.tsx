"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { decodeCsvBytes, parseZaimCsv } from "@/lib/import/zaim-parser";
import { saveHouseholdData } from "@/lib/storage/local-storage-adapter";
import { StorageQuotaError } from "@/lib/types";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ImportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState(0);
  const [appError, setAppError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppError(null);
    setFileError(null);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const app = formData.get("app");

    if (app !== "zaim") {
      setAppError(
        app === "moneytree"
          ? "Moneytree は準備中です。Zaim を選択してください"
          : "アプリを選択してください",
      );
      return;
    }

    if (!file) {
      setFileError("ファイルを選択してください");
      return;
    }

    setStatus("loading");

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const text = decodeCsvBytes(bytes);
      const result = parseZaimCsv(text);

      if (!result.success) {
        setStatus("error");
        setMessage(result.errors.join(" / "));
        return;
      }

      saveHouseholdData(result.dataset, result.transactions);
      setTransactionCount(result.transactionCount);
      setStatus("success");
      setMessage(`${result.transactionCount}件の取引を取り込みました。`);
    } catch (error) {
      setStatus("error");
      if (error instanceof StorageQuotaError) {
        setMessage(error.message);
      } else {
        setMessage("取り込みに失敗しました。ファイルを確認してください。");
      }
    }
  }

  if (status === "success") {
    return (
      <section
        aria-label="取り込み結果"
        className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p className="text-sm font-medium text-green-800">{message}</p>
        <p className="text-sm text-gray-700">取引データ: {transactionCount}件</p>
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
    <form aria-label="取り込みフォーム" className="space-y-6" onSubmit={handleSubmit}>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-900">家計簿アプリ</legend>
        <label className="flex min-h-11 items-center gap-2 text-sm text-gray-800">
          <input type="radio" name="app" value="zaim" defaultChecked className="size-4" />
          Zaim
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm text-gray-400">
          <input type="radio" name="app" value="moneytree" disabled className="size-4" />
          Moneytree（準備中）
        </label>
        {appError && (
          <p role="alert" className="text-sm text-red-700">
            {appError}
          </p>
        )}
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="export-file" className="block text-sm font-medium text-gray-900">
          エクスポートファイル（CSV）
        </label>
        <input
          id="export-file"
          name="export-file"
          type="file"
          accept=".csv,text/csv"
          className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setFileError(null);
            setStatus("idle");
            setMessage(null);
          }}
        />
        {fileError && (
          <p role="alert" className="text-sm text-red-700">
            {fileError}
          </p>
        )}
      </div>

      {status === "loading" && (
        <p className="text-sm text-gray-600" aria-live="polite">
          取り込み中…
        </p>
      )}

      {status === "error" && message && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        取り込む
      </button>
    </form>
  );
}
