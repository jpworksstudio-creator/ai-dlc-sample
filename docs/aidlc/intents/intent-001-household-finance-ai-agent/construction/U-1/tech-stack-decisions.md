# Tech Stack Decisions

## Unit

Unit ID: U-1

## Decisions

| Area | Decision | Reason | Source | Shared Baseline Impact |
|---|---|---|---|---|
| フレームワーク | Next.js 16（App Router, Turbopack 既定） | D-19, D-26。LTS 最新安定版 | D-19 | baseline v1 更新 |
| ランタイム | Node.js ≥ 20.9.0 | Next.js 16 要件 | Next.js 16 docs | baseline v1 更新 |
| 言語 | TypeScript 6 | 型安全・Next.js 16 推奨（TS 5.1+） | D-26 | baseline v1 更新 |
| UI ライブラリ | React 19.2 | Next.js 16 同梱ライン | D-26 | baseline v1 更新 |
| スタイリング | Tailwind CSS 4 + `@tailwindcss/postcss` | v4 最新。Next.js PostCSS 統合 | D-26 | baseline v1 更新 |
| クライアント永続化 | Web Storage API（localStorage） | D-21。単純な JSON 永続化 | D-21 | 変更なし |
| LLM | Gemini API（`gemini-2.5-flash` 既定） | D-40。無料枠・日本語向け | D-40 | baseline 更新（Issue #8） |
| LLM 接続 | Next.js Route Handler `/api/chat` | API キー秘匿（KC-5） | Functional Design | — |
| CSV パース | `papaparse` 5 | ブラウザ/Node 両対応、Zaim CSV 向け | S-1, BR-5 | — |
| ID 生成 | `crypto.randomUUID()`（標準 API） | 追加依存なし | domain-entities | — |
| テスト | Vitest 4 + Testing Library 16 | Layer ごと Build/Test | D-26 | baseline v1 更新 |
| Lint / Format | `eslint-config-next` 16 + Prettier 3 | Next.js 16 同バージョンライン | D-26 | — |

### Gemini モデル

- **既定**: `gemini-2.5-flash`（無料枠向け。速度・コスト優先、NFR-U1-2 向け）
- **上書き**: 環境変数 `GEMINI_MODEL`
- **接続**: REST `generateContent` + `fetch`（追加 SDK なし。D-40）

### バージョン固定（npm 最新安定版 — 2026-07-06 確認、LLM は 2026-07-23 更新）

| Package | Version |
|---|---|
| `next` | 16.2.10 |
| `react` / `react-dom` | 19.2.7 |
| `typescript` | 6.0.3 |
| `tailwindcss` | 4.3.2 |
| `@tailwindcss/postcss` | 4.3.2 |
| `papaparse` | 5.5.4 |
| `vitest` | 4.1.9 |
| `@testing-library/react` | 16.3.2 |
| `eslint-config-next` | 16.2.10 |
| `prettier` | 3.9.4 |
| `@types/node` | 26.1.0 |
| `@types/react` | 19.2.17 |

## Dependency Additions

| Package | Version | Needed | Reason | Approved |
|---|---|---|---|---|
| `next` | 16.2.10 | Yes | フレームワーク | Approved |
| `react` / `react-dom` | 19.2.7 | Yes | Next.js 16 前提 | Approved |
| `typescript` | 6.0.3 | Yes | 型安全 | Approved |
| `tailwindcss` | 4.3.2 | Yes | UI スタイリング | Approved |
| `@tailwindcss/postcss` | 4.3.2 | Yes | Tailwind v4 + Next.js PostCSS | Approved |
| `papaparse` | 5.5.4 | Yes | Zaim CSV パース | Approved |
| `vitest` | 4.1.9 | Yes | ユニットテスト | Approved |
| `@testing-library/react` | 16.3.2 | Yes | コンポーネントテスト | Approved |
| `eslint-config-next` | 16.2.10 | Yes | Next.js 16 ESLint | Approved |
| `prettier` | 3.9.4 | Yes | フォーマット | Approved |
| `@types/node` | 26.1.0 | Yes | Node 型定義 | Approved |
| `@types/react` | 19.2.17 | Yes | React 型定義 | Approved |

## Shared Baseline

`construction/shared/tech-stack-baseline.md` を v1（2026-07-06 版固定）に更新済み。
