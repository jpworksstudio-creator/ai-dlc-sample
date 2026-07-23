# Known Constraints

## Source

- Inception artifacts
- Human-approved decisions（`decisions.md` D-1〜D-24）
- Construction Plan（承認済み 2026-07-06）

## Constraints

| ID | Constraint | Source | Applies To |
|---|---|---|---|
| KC-1 | Next.js 16（App Router, Turbopack 既定）をフレームワークとする | D-19, D-26 | all |
| KC-1a | Node.js ≥ 20.9.0 を開発・ビルド環境とする | Next.js 16 要件 | all |
| KC-2 | LLM は Gemini API を使用する（無料枠向け） | D-40（旧 D-20） | U-1 |
| KC-3 | 家計データの永続化はブラウザ localStorage のみ | D-7, D-21 | U-1 |
| KC-4 | AI 送信は質問文 + 関連取引要約のみ（一時送信） | D-17 | U-1 |
| KC-5 | API キーはサーバー側（Next.js API Route）で保持しクライアントに露出しない | D-40, Construction Plan | U-1 |
| KC-6 | 第1弾は Zaim 取り込みのみ。Moneytree は後回し | D-16, D-23 | U-1 |
| KC-7 | 認証・複数ユーザーは MVP 対象外 | requirements 対象外 | U-1 |
| KC-8 | スマホブラウザ 320px 以上を主要ターゲット | NFR-1 | U-1 |
| KC-9 | 本番デプロイ・Operations は本 Harness 対象外 | Harness 境界 | all |

## Notes

- NFR Assessment で Unit 固有の品質要件を追加する
- shared baseline の変更は人間承認後にのみ反映する
