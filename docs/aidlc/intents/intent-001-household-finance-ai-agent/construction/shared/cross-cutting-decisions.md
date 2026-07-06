# Cross-Cutting Decisions

## Version

Baseline Version: v1

## Decisions

| ID | Decision | Reason | Affected Units | Status |
|---|---|---|---|---|
| CCD-1 | OpenAI 呼び出しは Route Handler 経由のみ | API キー秘匿 | U-1 | Approved |
| CCD-2 | デフォルトモデル `gpt-5.4-mini`、上書きは `OPENAI_MODEL` | 最新 mini 系・速度・コスト（NFR-U1-2, D-26） | U-1 | Approved |
| CCD-3 | 会話履歴はセッション内メモリのみ | MVP 簡素化（Functional Design 差分） | U-1 | Approved |
| CCD-4 | 第1弾パッケージ追加は tech-stack-decisions に列挙の13件（バージョン固定） | 最小依存・最新安定版（D-26, D-27） | U-1 | Approved |
| CCD-5 | Moneytree 取り込みは第2弾（L-6） | D-23 | U-1 | Approved |

## Change Approval

- Change content: CCD-1〜4 の新規提案
- Change reason: NFR Assessment による技術・品質方針の確定
- Affected Units: U-1
- Impact on completed Units: なし
- Human Approval Status: Approved（2026-07-06, D-27）
