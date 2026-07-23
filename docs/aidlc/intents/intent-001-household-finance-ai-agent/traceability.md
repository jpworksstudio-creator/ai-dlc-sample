# トレーサビリティマトリクス

プロダクト仮説から実装ユニットまでの経路を追跡する。

```text
Hypothesis
  ↓
Success Metric
  ↓
Requirement
  ↓
User Story
  ↓
Screen
  ↓
Unit of Work
```

| ID | 種別 | 名称 | マップ先 | 未接続の理由 | 承認状態 |
|---|---|---|---|---|---|
| H-1 | 仮説 | 金額・カテゴリの誤りを補正し意図したカテゴリで支出把握 | SM-2 | | Pending |
| H-2 | 仮説 | 判別しづらい取引内容を理解できる形に整理 | SM-1 | | Pending |
| H-3 | 仮説 | エクスポートだけで十分な取引データを取得 | FR-1, FR-2 | | Pending |
| H-5 | 仮説 | 自然言語 Q&A が手動確認より負担が低い | SM-1 | | Pending |
| H-6 | 仮説 | 改善案と良かった点の評価をセット提供 | SM-3 | | Pending |
| SM-1 | 成功指標 | 代表質問5種類のうち4種類以上で30秒以内に応答 | NFR-2, FR-4, FR-5 | | Pending |
| SM-2 | 成功指標 | 食費・日用品・固定費が手動補正後±10%以内 | NFR-3, FR-6 | | Pending |
| SM-3 | 成功指標 | 家計相談10回中8回以上で改善案＋良かった点 | NFR-4, FR-8, FR-9 | | Pending |
| FR-1 | 機能要件 | Zaim エクスポート取り込み | S-1 | L-3: `zaim-parser.ts`, `/import` | Pending |
| FR-2 | 機能要件 | Moneytree エクスポート取り込み | S-2 | | Pending |
| FR-3 | 機能要件 | ブラウザローカルのみ保存 | S-1, S-2, S-8, NFR-5 | L-2: `web/lib/storage/local-storage-adapter.ts` | Pending |
| FR-4 | 機能要件 | 自然言語での AI 質問 | S-3 | L-4: `ChatView.tsx`, `/api/chat` | Pending |
| FR-5 | 機能要件 | テキスト応答 | S-3, NFR-2 | | Pending |
| FR-6 | 機能要件 | カテゴリ別支出回答 | S-4, NFR-3 | | Pending |
| FR-7 | 機能要件 | 明細の理解しやすい提示 | S-5 | | Pending |
| FR-8 | 機能要件 | 無駄遣い指摘・改善案 | S-6, NFR-4 | | Pending |
| FR-9 | 機能要件 | 良かった点の評価 | S-7, NFR-4 | | Pending |
| FR-10 | 機能要件 | 取り込みデータの削除 | S-8 | L-5: `delete-all.ts`, `/settings` | Pending |
| S-1 | ストーリー | Zaim エクスポート取り込み | SCR-1, SCR-2 | L-3: `ImportForm.tsx` | Pending |
| S-2 | ストーリー | Moneytree エクスポート取り込み | SCR-1, SCR-2 | | Pending |
| S-3 | ストーリー | 自然言語での AI 質問 | SCR-1, SCR-3 | L-4: `ChatView.tsx` | Pending |
| S-4 | ストーリー | カテゴリ別支出の把握 | SCR-3 | | Pending |
| S-5 | ストーリー | 取引明細の理解 | SCR-3 | | Pending |
| S-6 | ストーリー | 無駄遣いの指摘と改善案 | SCR-3 | | Pending |
| S-7 | ストーリー | 良かった点の評価 | SCR-3 | | Pending |
| S-8 | ストーリー | 家計データの削除 | SCR-4 | L-5: `SettingsPanel.tsx` | Pending |
| SCR-1 | 画面 | ホーム | U-1 | L-1/L-2: `page.tsx`, `HomeDatasetSummary.tsx` | Pending |
| SCR-2 | 画面 | データ取り込み | U-1 | L-3: `web/app/import/page.tsx` | Pending |
| SCR-3 | 画面 | AI チャット | U-1 | L-4: `web/app/chat/page.tsx` | Pending |
| SCR-4 | 画面 | 設定 | U-1 | L-5: `web/app/settings/page.tsx` | Pending |
| U-1 | ユニット | 家計 AI エージェント Web アプリ | S-1〜S-8 | | Pending |
| NFR-1 | 非機能要件 | スマホブラウザ対応（320px 以上） | SCR-1〜SCR-4 | | Pending |
| NFR-2 | 非機能要件 | 30秒以内応答（SM-1） | FR-5 | L-4: `GEMINI_TIMEOUT_MS` | Pending |
| NFR-3 | 非機能要件 | カテゴリ金額±10%（SM-2） | FR-6 | L-3: `category-normalizer.ts` | Pending |
| NFR-4 | 非機能要件 | 改善案＋良かった点（SM-3） | FR-8, FR-9 | L-4: `structured-response.ts` | Pending |
| NFR-5 | 非機能要件 | 端末外への永続送信なし | FR-3 | L-2: localStorage アダプター | Pending |

## ルール

- 承認された仮説は少なくとも1つの成功指標にマップする
- 承認された要件は少なくとも1つのストーリーにマップする
- UI ストーリーは少なくとも1つの画面にマップする
- 各ストーリーは主ユニットに1つマップするか、その理由を記録する
