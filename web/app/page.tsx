import { HomeDatasetSummary } from "@/components/HomeDatasetSummary";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <HomeDatasetSummary />

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
