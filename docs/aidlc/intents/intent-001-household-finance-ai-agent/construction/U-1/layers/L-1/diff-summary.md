# Layer Diff Summary

## Layer

Layer ID: L-1

## Scope

- Target stories: S-3（遷移導線のみ）, SCR-1
- Target requirements: NFR-1（320px+ レスポンシブ）, NFR-U1-1
- Files changed: `web/` 配下 8 ファイル + `.gitignore`

## Summary

Next.js 16.2.10 プロジェクトを `web/` に初期化。Tailwind CSS 4、App Router、AppShell（ヘッダー・フッターナビ 4 タブ）、ホーム画面（Empty 状態）を実装。

## Tests

- `npm run build` — Pass（Next.js 16.2.10 Turbopack）

## Risk

- `/import`, `/chat`, `/settings` は L-3〜L-5 で実装予定。L-1 時点ではナビリンク先は 404
