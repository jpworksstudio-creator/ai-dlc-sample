# Business Logic Model

## Unit

Unit ID: U-1

## Workflows

| Workflow | Trigger | Steps | Stories | Requirements |
|---|---|---|---|---|
| データセット概要取得 | ホーム表示・取り込み後 | 1. localStorage から HouseholdDataset を読み出す 2. 件数・最終取り込み日を算出 3. Empty/Success 状態を判定 | S-3 | FR-3, NFR-5 |
| Zaim エクスポート取り込み | ユーザーがファイル選択し取り込み実行 | 1. アプリ種別が Zaim であることを検証 2. CSV をパース 3. Transaction に正規化 4. カテゴリ補正（食費・日用品・固定費マッピング） 5. localStorage に保存 6. ImportResult を返す | S-1 | FR-1, FR-3, NFR-1, NFR-5 |
| AI 家計相談 | ユーザーが質問を送信 | 1. 空質問を拒否 2. localStorage から関連取引を抽出・要約 3. 取引正規化エンジンでカテゴリ・明細を整理 4. 質問 + 要約を API Route 経由で OpenAI に送信 5. 応答を構造化（金額・明細・改善案・良かった点） 6. 会話履歴に追加（セッション内） | S-3, S-4, S-5, S-6, S-7 | FR-4〜9, NFR-2〜4 |
| 全データ削除 | ユーザーが設定で削除確認 | 1. 確認ダイアログ表示 2. localStorage の家計データキーを削除 3. Empty 状態に遷移 | S-8 | FR-10, FR-3 |

### 第1弾対象外（後回し）

| Workflow | 備考 |
|---|---|
| Moneytree エクスポート取り込み | D-23。L-6 で実装予定。S-2, FR-2 |

## Preconditions

- ブラウザが localStorage を利用可能である
- AI 家計相談: 取り込み済みデータが1件以上存在する（Empty 時は SCR-3 へ遷移させずガイド）
- Zaim 取り込み: ユーザーが有効な Zaim CSV ファイルを選択している

## Postconditions

- 取り込み成功: HouseholdDataset と Transaction が localStorage に永続化される
- AI 相談成功: 構造化応答がチャット UI に表示され、会話履歴が更新される
- 削除成功: 家計関連キーが localStorage から除去され、ホームが Empty 状態になる

## Edge Cases

- CSV 形式不正・必須列欠落 → Validation Error、保存しない
- localStorage 容量超過（QuotaExceededError）→ Error 表示、取り込みロールバック
- AI API タイムアウト（30秒超）→ Error 表示、再試行可能
- AI API エラー（4xx/5xx）→ Error 表示、家計データはローカルに残る
- データ未取り込みで AI 相談 CTA → 取り込み画面への誘導
- 同一ファイルの再取り込み → 既存データを上書き（MVP は1データセット）
- Moneytree 選択（第1弾）→ 「準備中」メッセージまたは Zaim のみ選択可能 UI

## 共通方針との差分

| 項目 | 共通方針 | U-1 差分 | 理由 |
|---|---|---|---|
| Moneytree 取り込み | FR-2 あり | 第1弾は未実装 | D-23 |
| 会話履歴永続化 | ChatMessage は任意 | セッション内のみ（localStorage 非永続） | MVP 簡素化。リロードで履歴消去 |
| データセット | 1世帯 | 再取り込みで上書き | 父1名・単一世帯前提 |
