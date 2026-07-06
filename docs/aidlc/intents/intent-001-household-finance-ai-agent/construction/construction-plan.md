# Construction Plan

## Unit Order

| Order | Unit ID | User Value | Dependencies | Can Run In Parallel | Notes |
|---:|---|---|---|---|---|
| 1 | U-1 | 家計エクスポートの取り込みと AI による家計相談・改善支援 | None | No | 単一ユニット。下記 Per-Unit フローに従う |

## U-1 実装フロー（承認後）

```text
Functional Design ──▶ approve
NFR Assessment ──▶ approve
NFR Design ──▶ approve
Infrastructure Design ──▶ approve
Code Generation（Layer 単位・5〜8 ファイル）──▶ 各 Layer approve
UI Review ──▶ approve
```

## U-1 Code Generation Layer 案（草案）

| Layer | スコープ | 主なストーリー / 画面 | 備考 |
|---|---|---|---|
| L-1 | Next.js プロジェクト初期化、UI シェル、フッターナビ、SCR-1 ホーム（Empty） | S-3（遷移のみ）, SCR-1 | App Router、320px+ レスポンシブ |
| L-2 | localStorage データストア、ドメインモデル、getDatasetSummary | FR-3, NFR-5 | D-21 |
| L-3 | Zaim 取り込み（パース・正規化・保存）、SCR-2 | S-1, FR-1 | D-16 最優先 |
| L-4 | OpenAI 連携（API Route）、取引正規化、SCR-3 チャット基本 | S-3〜S-7, FR-4〜9 | D-17 Bプラン、D-20 |
| L-5 | SCR-4 設定、全データ削除 | S-8, FR-10 | |
| L-6 | Moneytree 取り込み | S-2, FR-2 | **後回し**（D-23）。第1弾は L-1〜L-5 |

Layer 分割は Functional Design / Code Generation Plan 承認時に確定する。

## Shared Constraints

- **フレームワーク**: Next.js 16（App Router, Turbopack 既定）16.2.10（D-19, D-26）
- **LLM**: OpenAI API（D-20）。API キーはサーバー側（Next.js API Route）で保持
- **永続化**: 家計データはブラウザ localStorage のみ（D-7, D-21）。サーバー永続化なし
- **AI 送信データ**: 質問文 + 関連取引要約のみ、一時送信（D-17）
- **取り込み優先**: Zaim → Moneytree（D-16）
- **対象外**: 本番デプロイ、Operations、認証・複数ユーザー

## Conditional Skills

| Skill | Run / Skip | Reason |
|---|---|---|
| `aidlc-nfr-design-lite` | Run | NFR-1〜5（応答時間、精度、プライバシー）の設計パターンが必要 |
| `aidlc-infrastructure-design-lite` | Run | OpenAI API 接続、環境変数、Next.js API Route の設計が必要 |
| `aidlc-ui-review-lite` | Run | 全ストーリー UI 必須。SCR-1〜4 のワイヤーフレームあり |

## Approval

Status: Approved

Reviewer: ユーザー

Reviewed At: 2026-07-06
