# 決定事項

| ID | 日付 | 決定内容 | 理由 | 検討した代替案 | 状態 |
|---|---|---|---|---|---|
| D-1 | 2026-06-07 | プラットフォームは Web アプリとする（スマホブラウザ利用） | ネイティブ開発を避け、MVP を迅速に検証するため | ネイティブアプリ | Approved |
| D-2 | 2026-06-07 | ネイティブアプリは作らない | スコープと開発コストを抑えるため | iOS / Android アプリ | Approved |
| D-3 | 2026-06-07 | データ取得は家計簿アプリからのエクスポートを前提とする | API 連携の複雑さを避け、まずエクスポートで仮説検証するため | API 自動連携 | Approved |
| D-4 | 2026-06-07 | 主利用者は父とする | 家計把握・改善の実利用者を明確化するため | 母、両方 | Approved |
| D-5 | 2026-06-07 | MVP で対応する家計簿アプリは Zaim と Moneytree とする | 現行の利用ツールに合わせるため | マネーフォワード ME のみ | Approved |
| D-6 | 2026-06-07 | 「良かった点の評価」は MVP 必須とする（改善案とセット） | 改善だけでは継続利用が難しいため | 改善案のみ | Approved |
| D-7 | 2026-06-07 | 家計データは端末内（ブラウザローカル）のみに保存する | プライバシーと実装単純化のため | サーバー保存 | Approved |
| D-8 | 2026-06-07 | 成功指標 SM-1〜3 に定量的閾値を設定する | MVP 検証の合格基準を明確化するため | 定性指標のみ | Approved |
| D-9 | 2026-06-07 | 既存 Intent ディレクトリを再利用して Inception を開始する | Product Discovery 成果物の連続性を保つため | 新規 Intent 作成 | Approved |
| D-10 | 2026-06-07 | Inception ワークフロー（要件分析〜ユニット生成）を承認する | スマホ Web UI MVP に必要な全ステージを実行するため | ワイヤーフレーム省略 | Approved |
| D-11 | 2026-06-07 | 要件（FR-1〜10、NFR-1〜5）を承認する | Inception 次ステージの入力として確定するため | — | Approved |
| D-12 | 2026-06-07 | ユーザーストーリー（S-1〜8）を承認する | ワイヤーフレームの入力として確定するため | — | Approved |
| D-13 | 2026-06-07 | ワイヤーフレーム（SCR-1〜4）を承認する | アプリケーション設計の入力として確定するため | — | Approved |
| D-14 | 2026-06-07 | アプリケーション設計を承認する | ユニット生成の入力として確定するため | — | Approved |
| D-15 | 2026-06-07 | 単一ユニット（U-1）で MVP を進める | 小規模 MVP・単一 Web アプリで十分なため | 複数ユニット分割 | Approved |
| D-16 | 2026-06-07 | エクスポート対応は Zaim を最優先とする | 主利用ツールに合わせ、MVP 第1弾の検証を迅速化するため | Moneytree 同時最優先 | Approved |
| D-17 | 2026-06-07 | AI 応答時は質問文 + 関連取引の要約を外部 API に送信する（Bプラン） | 応答精度とプライバシーのバランスのため | A: 質問のみ / C: 集計のみ / D: ローカルのみ | Approved |
| D-18 | 2026-06-07 | Inception Exit を承認し、Construction 手前で停止する | 本 Harness の停止ルールに従うため | Construction 即開始 | Approved |
| D-19 | 2026-07-06 | 技術スタックは Next.js をベースとする | Q-2 回答・Construction 開始時のユーザー依頼 | Remix, Vite+React | Approved |
| D-20 | 2026-07-06 | LLM プロバイダは OpenAI とする | Construction Input Readiness 承認時のユーザー回答 | Anthropic, ローカル LLM | Approved |
| D-21 | 2026-07-06 | 家計データの端末内永続化は localStorage を用いる | Construction Input Readiness 承認時のユーザー回答 | IndexedDB, sessionStorage | Approved |
| D-22 | 2026-07-06 | Construction Input Readiness を承認する | Inception 成果物が Construction 開始に十分であるため | — | Approved |
| D-23 | 2026-07-06 | Moneytree 取り込み（L-6 / FR-2 / S-2）は第1弾実装から除外し後回しとする | D-16 に沿い Zaim 優先。Construction Plan 承認時のユーザー判断 | L-6 を第1弾に含める | Approved |
| D-24 | 2026-07-06 | Construction Plan を承認する | U-1 の実装順・Layer 案・制約を確定するため | — | Approved |
| D-25 | 2026-07-06 | U-1 Functional Design を承認する | ビジネスロジック・エンティティ・ルールを確定するため | — | Approved |
| D-26 | 2026-07-06 | 技術スタックを npm 最新安定版に更新する（Next.js 16.2.10 等） | ユーザー依頼。LTS・最新 mini LLM を採用 | Next.js 15, gpt-4o-mini | Approved |
| D-27 | 2026-07-06 | U-1 NFR Assessment を承認する（依存13件・gpt-5.4-mini 含む） | 品質要件と技術選定を確定するため | — | Approved |
| D-28 | 2026-07-06 | U-1 NFR Design を承認する | NFR パターンと論理コンポーネントを確定するため | — | Approved |
| D-29 | 2026-07-06 | U-1 Infrastructure Design を承認する | 環境変数・API 接続・ランタイム形状を確定するため | — | Approved |
| D-30 | 2026-07-06 | U-1 Code Generation Plan を承認する | L-1〜L-5 の Layer 分割を確定するため | — | Approved |
| D-31 | 2026-07-08 | U-1 Code Generation L-1 を承認する | App Shell・ホーム Empty・build 成功を確認 | — | Approved |
| D-32 | 2026-07-14 | U-1 Code Generation L-2 を承認する | localStorage・ドメインモデル・Vitest・ホーム連携を確認 | — | Approved |
| D-33 | 2026-07-14 | U-1 Code Generation L-3 を承認する | Zaim CSV 取り込み・カテゴリ正規化・SCR-2 を確認 | — | Approved |
| D-34 | 2026-07-15 | U-1 Code Generation L-4 を承認する | `/api/chat`・チャット UI・構造化応答を確認 | — | Approved |
| D-35 | 2026-07-15 | U-1 Code Generation L-5 を承認する | 設定・全削除・SCR-4 を確認。次ステージは保留 | — | Approved |

## 備考

- Product Discovery および Inception フェーズで人間が承認した決定事項を記録する
- 未承認の前提は決定事項として記録しない
- D-9 は intent-bootstrap レビュー承認後に Approved に更新する
