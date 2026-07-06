# Construction Input Readiness

## Status

Ready

## Checked Inputs

- Components: ✅ 7コンポーネント（UI シェル、取り込み、ローカルデータストア、正規化、AI ゲートウェイ、チャットプレゼンター、設定）— `inception/application-design.md`
- Responsibilities: ✅ 各コンポーネントの責務・所有データが定義済み
- Dependencies: ✅ From/To/理由の依存関係表あり
- Services: ✅ 取り込み・家計問い合わせ・家計助言・データライフサイクルの4サービス
- Cross-cutting Concerns: ✅ 認証不要、入力検証、プライバシー（D-7, D-17）、エラーハンドリング
- Data Model: ✅ HouseholdDataset, Transaction, ChatMessage, ImportResult
- API Overview: ✅ importExport, getDatasetSummary, queryAgent, deleteAllData
- External Dependencies: ✅ Zaim/Moneytree エクスポート（ユーザー操作）、外部 LLM API（D-17 Bプラン）
- Unit ID: ✅ U-1（家計 AI エージェント Web アプリ）
- Unit to Story mapping: ✅ S-1〜S-8 → U-1
- Unit to Requirement mapping: ✅ 完了条件に FR-1〜FR-10, NFR-1〜NFR-5, SCR-1〜4
- Unit user value: ✅ 家計エクスポート取り込みと AI による家計相談・改善支援
- Unit dependencies: ✅ 単一ユニットのため依存なし（理由記載済み）
- Completion conditions: ✅ FR-1〜10 充足、SM-1〜3（NFR-2〜4）検証、SCR-1〜4 実装

## Human-Provided Construction Constraints

- **技術スタック**: Next.js をベースとする（`open-questions.md` Q-2 回答、ユーザー明示依頼 2026-06-07）
- **エクスポート優先順位**: Zaim 最優先、Moneytree 第2弾（D-16）
- **AI データ送信**: 質問文 + 関連取引要約のみ（D-17 Bプラン）

## Gaps

| Gap | Required Inception Fix | Blocks Construction |
|---|---|---|
| 外部 LLM プロバイダ未選定 | ~~Construction の `tech-stack-decisions.md` で決定~~ → **OpenAI（D-20）** | No |
| ローカルストレージの具体方式（IndexedDB 等）未記載 | ~~Functional Design で決定~~ → **localStorage（D-21）** | No |
| Zaim CSV の列定義・サンプル未添付 | 実装 Layer でサンプルファイルまたは公式仕様を参照 | No |
| Q-2 の期限・ビジネス制約は未設定 | Construction Plan で任意設定、またはスキップ | No |
| Q-1 はスキップ済み | 追加の対象外指定なし | No |

## Decision

Proceed to Construction Plan
