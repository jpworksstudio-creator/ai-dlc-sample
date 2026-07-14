# Code Generation Plan

## Unit

Unit ID: U-1

## Application Root

リポジトリ直下の `web/` に Next.js 16 アプリを配置する（Harness 成果物 `docs/` と分離）。

## Layers

| Layer ID | Purpose | Target Stories / FR | Planned Files | Tests | Approval |
|---|---|---|---|---|---|
| L-1 | プロジェクト初期化、App Shell、フッターナビ、ホーム（Empty） | SCR-1, NFR-1 | 8 files（下表） | `npm run build` | Approved |
| L-2 | localStorage、ドメインモデル、DatasetSummary | FR-3, NFR-5, S-3 前提 | 6 files | Vitest 2件 | Approved |
| L-3 | Zaim CSV 取り込み、カテゴリ正規化、取り込み画面 | S-1, FR-1, NFR-3 | 7 files | Vitest 2件 + fixture | Approved |
| L-4 | `/api/chat`、OpenAI 連携、チャット UI、`.env.example` | S-3〜S-7, FR-4〜9 | 8 files | Vitest 2件 | Approved |
| L-5 | 設定画面、全データ削除 | S-8, FR-10 | 5 files | Vitest 1件 | Approved |

L-6（Moneytree）は D-23 により本 Plan 対象外。

### L-1 ファイル一覧

| # | Path |
|---|---|
| 1 | `web/package.json` |
| 2 | `web/tsconfig.json` |
| 3 | `web/next.config.ts` |
| 4 | `web/postcss.config.mjs` |
| 5 | `web/app/globals.css` |
| 6 | `web/app/layout.tsx` |
| 7 | `web/app/page.tsx` |
| 8 | `web/components/AppShell.tsx`（フッターナビ含む） |

### L-2 ファイル一覧

| # | Path |
|---|---|
| 1 | `web/lib/types.ts` |
| 2 | `web/lib/storage/keys.ts` |
| 3 | `web/lib/storage/local-storage-adapter.ts` |
| 4 | `web/lib/services/dataset-summary.ts` |
| 5 | `web/vitest.config.ts` |
| 6 | `web/lib/storage/local-storage-adapter.test.ts` |

### L-3 ファイル一覧

| # | Path |
|---|---|
| 1 | `web/lib/import/category-normalizer.ts` |
| 2 | `web/lib/import/zaim-parser.ts` |
| 3 | `web/app/import/page.tsx` |
| 4 | `web/components/ImportForm.tsx` |
| 5 | `web/fixtures/zaim-sample.csv` |
| 6 | `web/lib/import/category-normalizer.test.ts` |
| 7 | `web/lib/import/zaim-parser.test.ts` |

### L-4 ファイル一覧

| # | Path |
|---|---|
| 1 | `web/app/api/chat/route.ts` |
| 2 | `web/lib/ai/transaction-summarizer.ts` |
| 3 | `web/lib/ai/structured-response.ts` |
| 4 | `web/app/chat/page.tsx` |
| 5 | `web/components/ChatView.tsx` |
| 6 | `web/.env.example` |
| 7 | `web/app/api/chat/route.test.ts` |
| 8 | `web/lib/ai/transaction-summarizer.test.ts` |

### L-5 ファイル一覧

| # | Path |
|---|---|
| 1 | `web/app/settings/page.tsx` |
| 2 | `web/components/SettingsPanel.tsx` |
| 3 | `web/components/DeleteConfirmDialog.tsx` |
| 4 | `web/lib/storage/delete-all.ts` |
| 5 | `web/lib/storage/delete-all.test.ts` |

## Rules

- 各 Layer は 5〜8 ファイル以内（本 Plan で遵守）
- Plan 承認後に L-1 を実装。各 Layer 完了ごとに Build/Test と人間チェックポイント
- `traceability.md` を Layer 承認ごとに更新
- Secret は `.env.example` にプレースホルダのみ

## Approval

Status: Approved

Reviewer: ユーザー

Reviewed At: 2026-07-06
