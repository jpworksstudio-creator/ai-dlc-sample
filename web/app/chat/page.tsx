import Link from "next/link";
import { ChatView } from "@/components/ChatView";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100dvh-8.5rem)] flex-col gap-3">
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/"
          aria-label="ホームへ戻る"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-gray-700"
        >
          ←
        </Link>
        <h2 className="text-base font-semibold text-gray-900">AI に相談</h2>
      </div>

      <ChatView />
    </div>
  );
}
