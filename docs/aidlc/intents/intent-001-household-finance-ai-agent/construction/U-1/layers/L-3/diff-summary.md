# Layer Diff Summary

## Layer

Layer ID: L-3

## Scope

- Target stories: S-1
- Target requirements: FR-1, FR-3, NFR-3（カテゴリ正規化）
- Files changed: 7（計画どおり）+ `package.json` / lock（papaparse 依存追加）

## Summary

Zaim CSV パーサー（必須列検証・収入行スキップ・5MB 上限）、カテゴリ正規化（食費/日用品/固定費/その他）、取り込み画面 SCR-2（`/import` + `ImportForm`）、サンプル fixture を実装。Moneytree は disabled（BR-11 / D-23）。

## Tests

- `npm test` — Pass（8 tests: L-2 4 + L-3 4）
- `npm run build` — Pass（`/import` ルート追加）

## Risk

- 実 Zaim エクスポートの列名差分は fixture でカバー。ユーザー実ファイルで列名が異なる場合は追加マッピングが必要
