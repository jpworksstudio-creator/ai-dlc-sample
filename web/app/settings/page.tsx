import Link from "next/link";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="ホームへ戻る"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-gray-700"
        >
          ←
        </Link>
        <h2 className="text-base font-semibold text-gray-900">設定</h2>
      </div>

      <SettingsPanel />
    </div>
  );
}
