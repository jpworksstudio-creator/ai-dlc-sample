# Tech Stack Baseline

## Version

Baseline Version: v1（2026-07-06 — 最新安定版ピン留め）

## Approved Baseline

| Area | Decision | Version | Reason | Affected Units |
|---|---|---|---|---|
| フレームワーク | Next.js（App Router, Turbopack 既定） | 16.2.10 | D-19, D-26。LTS 最新 | U-1 |
| ランタイム | Node.js | ≥ 20.9.0 | Next.js 16 要件 | U-1 |
| UI | React | 19.2.7 | Next.js 16 同梱ライン | U-1 |
| 言語 | TypeScript | 6.0.3 | 最新安定 | U-1 |
| スタイリング | Tailwind CSS + PostCSS プラグイン | 4.3.2 | Tailwind v4 最新 | U-1 |
| クライアント永続化 | localStorage | — | D-21 | U-1 |
| LLM | Gemini API | REST + fetch / モデル `gemini-2.5-flash` | D-40 | U-1 |
| テスト | Vitest + Testing Library | 4.1.9 / 16.3.2 | Layer 検証 | U-1 |
| Lint | eslint-config-next | 16.2.10 | Next.js 同バージョン | U-1 |

## Change Approval

- Change content: Next.js 15 → 16、その他パッケージを npm 最新安定版に更新（D-26）
- Change reason: ユーザー依頼（2026-07-06）
- Affected Units: U-1
- Impact on completed Units: なし
- Human Approval Status: Approved（2026-07-06, D-27）
