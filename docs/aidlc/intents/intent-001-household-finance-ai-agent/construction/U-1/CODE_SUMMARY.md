# Code Summary

## Unit

Unit ID: U-1

## Implemented Layers

| Layer | Summary | Files Changed | Tests Added | Review |
|---|---|---|---|---|
| L-1 | Next.js 16 初期化、AppShell、ホーム Empty | 8 + .gitignore | build | 承認済み（D-31） |
| L-2 | localStorage、ドメインモデル、DatasetSummary | 8 | Vitest 4件 | 承認済み（D-32） |
| L-3 | Zaim CSV 取り込み、カテゴリ正規化、SCR-2 | 7 + papaparse | Vitest 4件 | 承認済み（D-33） |
| L-4 | `/api/chat`、OpenAI、SCR-3 チャット | 8 + openai | Vitest 4件 | 承認済み（D-34） |
| L-5 | 設定・全データ削除、SCR-4 | 5 | Vitest 1件 | 承認済み（D-35） |
| UI Review | SCR-1〜4 照合、Concern 許容・入力下部固定 | — | — | 承認済み（D-36） |

## Traceability

| Requirement | Story | Unit | Layer | Notes |
|---|---|---|---|---|
| NFR-1 | S-1, S-2, S-3 | U-1 | L-1 | SCR-1 ホーム・レスポンシブシェル |
| SCR-1 | S-1, S-2, S-3 | U-1 | L-1 | `web/app/page.tsx`, `AppShell.tsx` |
| FR-3 | S-1, S-2, S-8 | U-1 | L-2 | `local-storage-adapter.ts` |
| NFR-5 | S-1, S-2 | U-1 | L-2 | 端末内 localStorage のみ |
| SCR-1 | S-3 | U-1 | L-2 | `HomeDatasetSummary.tsx` |
| FR-1 | S-1 | U-1 | L-3 | `zaim-parser.ts`, `ImportForm.tsx` |
| NFR-3 | S-4 | U-1 | L-3 | `category-normalizer.ts` |
| SCR-2 | S-1 | U-1 | L-3 | `web/app/import/page.tsx` |
| FR-4〜9 | S-3〜S-7 | U-1 | L-4 | `ChatView.tsx`, `/api/chat` |
| NFR-2 / NFR-4 | S-3, S-6, S-7 | U-1 | L-4 | タイムアウト・構造化応答 |
| SCR-3 | S-3〜S-7 | U-1 | L-4 | `web/app/chat/page.tsx` |
| FR-10 | S-8 | U-1 | L-5 | `delete-all.ts`, `SettingsPanel.tsx` |
| SCR-4 | S-8 | U-1 | L-5 | `web/app/settings/page.tsx` |
