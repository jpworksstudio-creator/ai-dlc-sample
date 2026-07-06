# Domain Entities

## Unit

Unit ID: U-1

## Entities

| Entity | Fields | Owner | Relationships | Rules |
|---|---|---|---|---|
| HouseholdDataset | `id`, `sourceApp`（zaim \| moneytree）, `importedAt`（ISO8601）, `transactionCount` | localStorage | 1 Dataset → N Transaction | MVP は常に1件のみ保持。再取り込みで上書き |
| Transaction | `id`, `date`, `amount`（数値）, `category`, `description`, `rawDescription`, `sourceRow` | localStorage | N → 1 HouseholdDataset | `amount` は支出を正の数で保持。カテゴリは正規化後の値 |
| ChatMessage | `id`, `role`（user \| assistant）, `content`, `timestamp`, `structuredResponse?` | メモリ（セッション） | 会話スレッド内の順序 | リロードで消去。assistant は structuredResponse を持ち得る |
| StructuredAgentResponse | `categoryAmounts?`, `transactions?`, `improvements[]`, `positives[]`, `summary` | —（値オブジェクト） | ChatMessage に埋め込み | improvements・positives は各1件以上（NFR-4） |
| ImportResult | `success`, `transactionCount`, `errors[]` | —（操作結果） | 取り込み Workflow の出力 | success=false 時は errors に理由 |

### カテゴリ正規化（参照）

| 正規化カテゴリ | 用途 |
|---|---|
| 食費 | SM-2, S-4 |
| 日用品 | SM-2, S-4 |
| 固定費 | SM-2, S-4 |
| その他 | 上記以外の支出 |

### localStorage キー（論理）

| Key | 内容 |
|---|---|
| `hfai:dataset` | HouseholdDataset JSON |
| `hfai:transactions` | Transaction[] JSON |

## Notes

- Moneytree 用 `sourceApp` はエンティティ上は定義済みだが、第1弾パーサーは未実装（D-23）
- Transaction の `id` は取り込み時に UUID または行ハッシュで生成
