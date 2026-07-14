# Layer Diff Summary

## Layer

Layer ID: L-5

## Scope

- Target stories: S-8
- Target requirements: FR-10, FR-3
- Files changed: 計画 5 ファイル

## Summary

設定画面 SCR-4（保存件数・端末内保存の説明）、削除確認ダイアログ（BR-10）、`deleteAllHouseholdData` による全データ削除を実装。削除成功後はホームへの導線を表示。

## Tests

- `npm test` — Pass（13 tests）
- `npm run build` — Pass（`/settings` 追加）

## Risk

なし（破壊操作は確認ダイアログ必須）
