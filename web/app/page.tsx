import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
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

      <section className="rounded-lg border border-gray-200 p-4">
        <h2 className="text-sm font-medium text-gray-600">クイック質問例</h2>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          <li>「先月の食費はいくら？」</li>
          <li>「無駄な支出はどこ？」</li>
        </ul>
      </section>
    </div>
  );
}
