"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { StructuredAgentResponse } from "@/lib/ai/structured-response";
import { summarizeTransactions } from "@/lib/ai/transaction-summarizer";
import { getTransactions, hasHouseholdData } from "@/lib/storage/local-storage-adapter";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  structured?: StructuredAgentResponse;
};

const SAMPLE_QUESTIONS = [
  "先月の食費はいくら？",
  "無駄な支出はどこ？",
  "先月の総支出は？",
];

function formatYen(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function AssistantBubble({ message }: { message: ChatMessage }) {
  const structured = message.structured;
  if (!structured) {
    return <p className="text-sm text-gray-800">{message.content}</p>;
  }

  return (
    <div className="space-y-2 text-sm text-gray-800">
      <p>{structured.summary}</p>
      {structured.categoryAmounts && (
        <ul className="space-y-1">
          {Object.entries(structured.categoryAmounts).map(([category, amount]) => (
            <li key={category}>
              <strong>
                {category}: {formatYen(amount)}
              </strong>
            </li>
          ))}
        </ul>
      )}
      {structured.transactions && structured.transactions.length > 0 && (
        <div>
          <p className="font-medium">明細:</p>
          <ul className="mt-1 space-y-1">
            {structured.transactions.map((tx, index) => (
              <li key={`${tx.date}-${index}`}>
                {tx.date} {tx.description} {formatYen(tx.amount)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        <strong>改善案:</strong> {structured.improvements.join(" / ")}
      </p>
      <p>
        <strong>良かった点:</strong> {structured.positives.join(" / ")}
      </p>
    </div>
  );
}

export function ChatView() {
  const [ready, setReady] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHasData(hasHouseholdData());
    setReady(true);
  }, []);

  async function sendQuestion(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setLoading(true);
    setQuestion("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const transactions = getTransactions();
      const summary = summarizeTransactions(transactions, trimmed);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, summary }),
      });
      const data = (await res.json()) as {
        response?: StructuredAgentResponse;
        error?: string;
      };

      if (!res.ok || !data.response) {
        throw new Error(data.error ?? "応答を取得できませんでした");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response.summary,
        structured: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "応答を取得できませんでした。もう一度お試しください。",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(question);
  }

  if (!ready) {
    return <p className="text-sm text-gray-600">読み込み中…</p>;
  }

  if (!hasData) {
    return (
      <section className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          データが未取り込みです。先に家計データを取り込んでください。
        </p>
        <Link
          href="/import"
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          データを取り込む
        </Link>
      </section>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section
        aria-label="会話履歴"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-3"
      >
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">サンプル質問</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUESTIONS.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  className="min-h-11 rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-800"
                  onClick={() => void sendQuestion(sample)}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-8 rounded-lg bg-gray-100 px-3 py-2 text-right text-sm text-gray-900"
                : "mr-4 rounded-lg border border-gray-200 bg-white px-3 py-2"
            }
          >
            {message.role === "user" ? (
              message.content
            ) : (
              <AssistantBubble message={message} />
            )}
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-600" aria-live="polite">
            考え中…
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
      </section>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 shrink-0 space-y-2 border-t border-gray-200 bg-white pt-3"
      >
        <label htmlFor="question" className="block text-sm font-medium text-gray-900">
          質問を入力
        </label>
        <textarea
          id="question"
          rows={2}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="家計について質問…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          送信
        </button>
      </form>
    </div>
  );
}
