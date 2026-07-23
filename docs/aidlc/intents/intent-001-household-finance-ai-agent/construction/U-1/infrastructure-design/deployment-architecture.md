# Deployment Architecture

## Unit

Unit ID: U-1

## Intended Runtime Shape

```text
┌─────────────────────────────────────────┐
│  ブラウザ（父・スマホ Web）                │
│  ├─ Next.js Client Components           │
│  ├─ localStorage（家計データ永続）        │
│  └─ fetch → /api/chat                   │
└──────────────────┬──────────────────────┘
                   │ HTTPS（同一オリジン）
┌──────────────────▼──────────────────────┐
│  Next.js 16 サーバー（Node.js ≥ 20.9）    │
│  ├─ App Router（静的+動的ページ）         │
│  ├─ Route Handler: POST /api/chat        │
│  │    └─ GEMINI_API_KEY（サーバーのみ）   │
│  └─ ビルド: Turbopack（next build）       │
└──────────────────┬──────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────┐
│  Gemini API（gemini-2.5-flash）          │
│  ※ 質問 + 取引要約のみ一時送信            │
└─────────────────────────────────────────┘
```

- **ステートレスサーバー**: 家計データはサーバーに保存しない
- **第1弾スコープ**: Zaim 取り込み + AI チャット + 設定（L-1〜L-5）

## Development Environment

- **環境変数**: `.env.local`（`GEMINI_API_KEY` 必須。`GEMINI_MODEL`, `GEMINI_TIMEOUT_MS` は任意）
- **Mock / Fixture**: `GEMINI_API_KEY=mock` で API スタブ。Zaim サンプル CSV を fixtures に配置
- **外部 API 前提**: 開発者が Gemini API キーを保有。オフライン時はモックモード

## Production Boundary

本 Construction Harness では本番デプロイは対象外。

将来 Operations でデプロイする場合の想定（参考のみ、今回は実施しない）:

| 項目 | 想定 |
|---|---|
| ホスティング | Vercel 等（Next.js 互換） |
| 環境変数 | ホスティングの Secret 管理で `GEMINI_API_KEY` 設定 |
| データ | 引き続きクライアント localStorage のみ |
