# Layer Diff Summary

## Layer

Layer ID: L-2

## Scope

- Target stories: S-3 前提（ホーム状態表示）
- Target requirements: FR-3, NFR-5
- Files changed: 計画 6 ファイル + ホーム連携 2 ファイル（`HomeDatasetSummary.tsx`, `page.tsx` 更新）

## Summary

ドメインモデル（`HouseholdDataset`, `Transaction`, `DatasetSummary`）、localStorage アダプター（CRUD・Quota Guard）、`getDatasetSummary` サービス、Vitest 設定・ユニットテスト 4 件を追加。ホーム画面を `getDatasetSummary` 連携のクライアントコンポーネントに更新（Empty / 取り込み済みの 2 状態）。

## Tests

- `npm test` — Pass（4 tests）
- `npm run build` — Pass（Next.js 16.2.10 Turbopack）

## Risk

- ホームの取り込み済み表示は L-3 取り込み実装まで手動で localStorage を入れないと確認できない
