# UI Review

## Unit

Unit ID: U-1

## Checked Against

- Stories: S-1, S-3, S-4, S-5, S-6, S-7, S-8（S-2 は D-23 により第1弾 UI 対象外・準備中表示）
- Wireframes: SCR-1〜SCR-4（`inception/wireframes/`）
- NFRs: NFR-1（320px+ / max-width 480px）、NFR-U1-1 Mobile-first、UI 隣接 Security（Output Encoding / エラー露出）

## Screen Mapping

| Screen | Route | Main Components | Story |
|---|---|---|---|
| SCR-1 ホーム | `/` | `AppShell`, `HomeDatasetSummary` | S-1, S-3 |
| SCR-2 取り込み | `/import` | `ImportForm` | S-1 |
| SCR-3 チャット | `/chat` | `ChatView` | S-3〜S-7 |
| SCR-4 設定 | `/settings` | `SettingsPanel`, `DeleteConfirmDialog` | S-8 |

## UI States

| State | Covered | Notes |
|---|---|---|
| Loading | Partial | 取り込み「取り込み中…」、チャット「考え中…」、設定「読み込み中…」あり。ホームは初期 Empty フラッシュで専用スピナーなし |
| Empty | Yes | ホーム未取り込み、チャット未データ誘導、設定 0件 |
| Error | Yes | 取り込み形式/Quota、チャット API 失敗。ホームの「読み込み失敗」専用 UI はなし |
| Success | Yes | ホーム件数・最終日、取り込み件数、チャット構造化応答、削除完了 |
| Validation Error | Yes | ファイル未選択、不正 CSV。アプリ未選択は Zaim 既定選択のため実運用では稀 |
| Permission Denied | N/A | 認証なし MVP（意図どおり） |

## Accessibility

- Labels: 主要 form（file / textarea / radio legend）に label あり。送信ボタン文言は「送信」（WF は「質問を送信」）
- Keyboard: リンク・ボタン・入力は自然順。削除ダイアログにフォーカストラップ / Escape 未実装
- Focus: `min-h-11` タッチターゲットあり。現在ページのナビ強調なし
- Error messaging: `role="alert"` / `aria-live` を主要エラー・Loading に使用。内容は具体的

## Responsive

- `AppShell` の `max-w-[480px]` + 単一カラムで NFR-1 / WF の Mobile-first に整合
- CTA・フォーム・削除ボタンは全幅

## Security Lite（UI 隣接）

- React テキスト描画のため XSS 的な生 HTML 埋め込みなし（Output Encoding）
- API エラーは汎用メッセージ中心。Secret を UI に表示しない
- `OPENAI_API_KEY` はクライアント非露出（Route Handler）

## Findings Summary

| Severity | Finding | Proposed Fix（任意） |
|---|---|---|
| Concern | ホームに WF 記載の Loading / Error 専用状態がない | 読み込み完了までスケルトン、壊れた JSON 時の Error バナーを追加 |
| Concern | チャット送信ボタンの accessible name が WF と不一致 | `aria-label="質問を送信"` または文言変更 |
| Concern | 削除ダイアログにフォーカストラップ / Esc がない | 初期フォーカス移動 + Esc でキャンセル |
| Concern | チャット入力が `position: sticky/fixed` ではない | **対応済み**: 会話エリア scroll + 入力 `sticky bottom-0` |
| Info | フッターに current ページ強調なし | MVP 許容。後続で `aria-current` 追加可 |
| Info | Moneytree は disabled（準備中） | D-23 どおり。差分として意図的 |

## Human Decisions（2026-07-16）

| # | Concern | Decision |
|---|---|---|
| 1 | ホーム Loading / Error | 許容（MVP） |
| 2 | 送信ボタン accessible name | 「送信」のままでよい |
| 3 | 削除ダイアログ focus trap / Esc | マウス中心のため当面許容 |
| 4 | チャット入力下部固定 | **修正実施**（`ChatView` / `chat/page.tsx`） |

## Approval

Status: Approved

Reviewer: ユーザー

Reviewed At: 2026-07-16

Blocking Failures: None
