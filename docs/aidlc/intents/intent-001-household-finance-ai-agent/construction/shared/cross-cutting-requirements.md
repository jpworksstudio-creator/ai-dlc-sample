# Cross-Cutting Requirements

## Requirements

| ID | Requirement | Source | Applies To | Notes |
|---|---|---|---|---|
| CCR-1 | 家計データをサーバーへ永続送信しない | NFR-5, D-7 | U-1 | localStorage のみ |
| CCR-2 | AI 応答は30秒以内を目標（SM-1 / NFR-2） | NFR-2 | U-1 | タイムアウト UI 必須 |
| CCR-3 | 食費・日用品・固定費の金額回答は手動補正後±10%以内（SM-2） | NFR-3 | U-1 | カテゴリ正規化ルールで担保 |
| CCR-4 | 改善案1件以上 + 良かった点1件以上を応答に含める（SM-3） | NFR-4 | U-1 | プロンプト設計で担保 |
| CCR-5 | 入力検証エラーを UI に表示する | application-design 横断関心事 | U-1 | 空質問、未選択ファイル等 |
| CCR-6 | プライバシー説明を設定画面に表示する | SCR-4, D-7 | U-1 | 端末内保存・AI 送信範囲 |
| CCR-7 | 破壊的操作（全削除）は確認ダイアログ必須 | SCR-4, S-8 | U-1 | |
| CCR-8 | レスポンシブ: 320px〜、最大幅 480px 中央配置 | wireframes, NFR-1 | U-1 | |

## Open Questions

- localStorage 容量超過時の挙動（Functional Design で BR として定義済み）
