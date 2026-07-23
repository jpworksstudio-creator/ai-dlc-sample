# Infrastructure Design

## Unit

Unit ID: U-1

## Environment Variables

| Name | Purpose | Required | Secret | Mockable | Notes |
|---|---|---|---|---|---|
| `GEMINI_API_KEY` | Gemini API 認証 | Yes（AI 機能有効時） | Yes | Yes（モック Route） | `.env.local` のみ。gitignore 必須 |
| `GEMINI_MODEL` | 使用モデル上書き | No | No | Yes | 未設定時 `gemini-2.5-flash`（D-40） |
| `GEMINI_TIMEOUT_MS` | API タイムアウト（ms） | No | No | Yes | 未設定時 `30000`（NFR-U1-2） |

## External API Conditions

| API | Purpose | Timeout | Retry | Mock / Fixture |
|---|---|---|---|---|
| Gemini generateContent API | 家計相談応答生成（構造化 JSON） | 30s（`GEMINI_TIMEOUT_MS`） | なし（MVP）。失敗時は UI エラー | `GEMINI_API_KEY=mock` 時にスタブ応答 Route |

### リクエスト仕様（Bプラン）

- **送信**: 質問文 + 関連取引要約（カテゴリ別集計・代表明細）
- **非送信**: 全取引 raw、localStorage 内容、API キー
- **応答**: JSON（`summary`, `categoryAmounts`, `improvements[]`, `positives[]`）

## Local Runtime Needs

- **Node.js**: ≥ 20.9.0（KC-1a）
- **開発起動**: `npm run dev`（Next.js 16, Turbopack 既定）
- **環境ファイル**: `.env.local` に `GEMINI_API_KEY` を設定
- **ブラウザ**: Chrome / Safari / Firefox 最新（localStorage 利用）
- **永続ストア**: サーバー側 DB・Redis 不要。クライアント localStorage のみ

## Mock / Fixture

| 用途 | 方法 |
|---|---|
| Gemini なし開発 | `GEMINI_API_KEY=mock` で `/api/chat` が固定 JSON を返す |
| Zaim CSV テスト | `fixtures/zaim-sample.csv`（L-3 で Code Generation 作成） |
| localStorage テスト | Vitest + `localStorage` mock |

## `.env.example` 要件（Code Generation で生成）

```text
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
GEMINI_TIMEOUT_MS=30000
```

## Provisioning Boundary

本 Harness ではデプロイ、Terraform Apply、監視設定、Secret の commit は行わない。本番デプロイは Operations（対象外）。
