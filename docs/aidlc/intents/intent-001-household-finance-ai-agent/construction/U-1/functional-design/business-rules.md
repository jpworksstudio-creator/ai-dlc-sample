# Business Rules

## Unit

Unit ID: U-1

## Rules

| Rule ID | Rule | Applies To | Source | Test Implication |
|---|---|---|---|---|
| BR-1 | 家計データは localStorage にのみ永続化し、サーバーへ送信しない | HouseholdDataset, Transaction | FR-3, NFR-5, D-7 | ネットワーク監視で永続 POST なし |
| BR-2 | AI へ送信するのは質問文と関連取引要約のみ | AI 家計相談 | D-17 | API リクエスト body を検証 |
| BR-3 | 空の質問は送信不可 | AI 家計相談 | CCR-5 | 送信ボタン無効 / Validation Error |
| BR-4 | データ未取り込み時は AI 相談を開始できない | ホーム, AI チャット | S-3 前提 | Empty 時 CTA が取り込み誘導 |
| BR-5 | Zaim CSV は必須列（日付・金額・内容・カテゴリ）を持つこと | Zaim 取り込み | A-1, S-1 | 欠落 CSV で Validation Error |
| BR-6 | 再取り込みは既存 Dataset/Transaction を全置換する | Zaim 取り込み | MVP 単一データセット | 2回目取り込みで件数が新データに一致 |
| BR-7 | 食費・日用品・固定費は Zaim カテゴリ名を正規化マップで変換する | 取引正規化 | NFR-3, H-1 | 既知サンプルで正規化結果を検証 |
| BR-8 | AI 応答は30秒以内を目標とし、超過時はタイムアウトエラー | AI 家計相談 | NFR-2 | モック遅延でタイムアウト UI |
| BR-9 | AI 応答には改善案1件以上と良かった点1件以上を含める | StructuredAgentResponse | NFR-4, SM-3 | 応答 JSON スキーマ検証 |
| BR-10 | 全削除は確認ダイアログ後のみ実行 | 設定 | CCR-7, S-8 | キャンセルでデータ残存 |
| BR-11 | 第1弾 UI では Zaim のみ取り込み可能。Moneytree は選択不可または準備中表示 | データ取り込み | D-23 | Moneytree 選択 UI が無効 |
| BR-12 | localStorage 容量超過時は取り込みを中止しエラー表示 | Zaim 取り込み | Edge case | QuotaExceeded をモック |

## Open Questions

- Zaim CSV の公式列名・エンコーディング（UTF-8 想定）— 実装 Layer L-3 でサンプルファイルに基づき確定
