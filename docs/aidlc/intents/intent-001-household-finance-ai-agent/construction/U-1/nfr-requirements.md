# NFR Requirements

## Unit

Unit ID: U-1

## NFRs

| NFR ID | Requirement | Measure | Source | Applies To |
|---|---|---|---|---|
| NFR-U1-1 | スマホブラウザ（320px 以上）で主要操作可能 | SCR-1〜4 が 320px 幅で操作可能。最大幅 480px 中央配置 | NFR-1, CCR-8 | L-1, UI Review |
| NFR-U1-2 | 代表質問5種類のうち4種類以上で30秒以内に応答 | API Route 全体で 30s タイムアウト。4/5 質問で P95 < 30s（手動検証） | NFR-2, SM-1, BR-8 | L-4 |
| NFR-U1-3 | 食費・日用品・固定費が手動補正後±10%以内 | テスト用サンプル CSV で3カテゴリ合計の誤差 ≤10% | NFR-3, SM-2, BR-7 | L-3, L-4 |
| NFR-U1-4 | 家計相談10回中8回以上で改善案+良かった点 | 構造化応答 JSON で improvements≥1, positives≥1 を検証。8/10 成功 | NFR-4, SM-3, BR-9 | L-4 |
| NFR-U1-5 | 家計データを端末外へ永続送信しない | localStorage のみ。サーバー DB なし。AI リクエストは要約のみ | NFR-5, BR-1, BR-2 | L-2, L-4 |
| NFR-U1-6 | OpenAI API キーをクライアントに露出しない | ブラウザから `OPENAI_API_KEY` 参照不可。API Route のみ | KC-5, Security | L-4 |
| NFR-U1-7 | 入力検証 | 空質問・未選択ファイル・不正 CSV で Validation Error | CCR-5, BR-3, BR-5 | L-3, L-4 |
| NFR-U1-8 | localStorage 障害時の可用性 | QuotaExceeded 時にユーザーへエラー表示しデータ破損なし | BR-12 | L-2, L-3 |

## Security Lite Notes

- Input validation: クライアント + API Route で質問長上限（例: 500文字）、CSV サイズ上限（例: 5MB）
- Authentication / authorization: MVP 不要。単一ユーザー・端末内（KC-7）
- Secrets: `OPENAI_API_KEY` はサーバー環境変数のみ。`.env.local` を gitignore
- Error exposure: ユーザー向けは汎用メッセージ。詳細はサーバーログのみ（家計データを含めない）
- External API timeout: OpenAI 呼び出し 30s（`AbortSignal`）
- Dependencies: `tech-stack-decisions.md` 参照。NFR Assessment 承認後に追加
- Logging sensitive data: 取引明細・質問全文をログ出力しない
