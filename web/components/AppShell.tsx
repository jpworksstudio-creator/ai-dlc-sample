import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/import", label: "取り込み" },
  { href: "/chat", label: "相談" },
  { href: "/settings", label: "設定" },
] as const;

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col bg-white shadow-sm">
      <header className="border-b border-gray-200 px-4 py-3 text-center">
        <h1 className="text-lg font-semibold">家計 AI エージェント</h1>
      </header>

      <main className="flex-1 px-4 py-4">{children}</main>

      <footer className="border-t border-gray-200 px-2 py-2">
        <nav aria-label="メインナビゲーション" className="flex justify-around text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 min-w-11 flex items-center justify-center px-2 py-2 text-gray-700 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
