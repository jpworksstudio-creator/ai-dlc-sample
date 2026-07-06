# Logical Components

## Unit

Unit ID: U-1

## Components

| Component | Purpose | NFR Supported | Dependencies |
|---|---|---|---|
| `AppShell` | フッターナビ・最大幅レイアウト・画面遷移 | NFR-U1-1 | Next.js App Router |
| `LocalStorageAdapter` | Dataset/Transaction の CRUD、Quota Guard | NFR-U1-5, NFR-U1-8 | Web Storage API |
| `DatasetSummaryService` | 件数・最終取り込み日・Empty 判定 | NFR-U1-1 | LocalStorageAdapter |
| `ZaimCsvImporter` | CSV 検証・パース・正規化・保存 | NFR-U1-3, NFR-U1-7 | papaparse, LocalStorageAdapter |
| `CategoryNormalizer` | Zaim カテゴリ → 正規化カテゴリ変換 | NFR-U1-3 | — |
| `TransactionSummarizer` | AI 送信用の関連取引要約生成 | NFR-U1-5, NFR-U1-2 | CategoryNormalizer, LocalStorageAdapter |
| `ChatApiRoute` (`/api/chat`) | 入力再検証・OpenAI 呼び出し・30s タイムアウト | NFR-U1-2, NFR-U1-6, NFR-U1-7 | openai SDK |
| `StructuredResponseParser` | JSON schema 検証（improvements/positives） | NFR-U1-4 | — |
| `ChatPresenter` | 金額・明細・改善案・良かった点の UI 表示 | NFR-U1-1, NFR-U1-4 | React |
| `SettingsManager` | プライバシー説明・全削除（確認ダイアログ） | NFR-U1-7, CCR-7 | LocalStorageAdapter |
| `ValidationErrorBoundary` | 取り込み/AI/Storage エラーの UI フィードバック | NFR-U1-7, NFR-U1-8 | React |

## Notes

- `MoneytreeCsvImporter` は L-6（後回し）で追加。インターフェースは `ZaimCsvImporter` と共通化予定
- `ChatApiRoute` は Server Component / Route Handler として実装し、クライアントバンドルに `openai` を含めない
