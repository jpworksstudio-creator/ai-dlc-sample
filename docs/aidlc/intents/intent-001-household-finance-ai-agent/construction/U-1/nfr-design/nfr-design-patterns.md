# NFR Design Patterns

## Unit

Unit ID: U-1

## Patterns

| NFR | Pattern | Reason | Tradeoff |
|---|---|---|---|
| NFR-U1-1 | Mobile-first レイアウト（`max-w-[480px] mx-auto`、固定フッターナビ、タッチターゲット 44px+） | 320px 以上で全画面操作可能 | タブレット/PC は中央狭幅のみ |
| NFR-U1-2 | BFF パターン: クライアント → `/api/chat` → OpenAI。`AbortSignal` 30s | レイテンシ制御・キー秘匿を一元化 | サーバー経由で1ホップ増 |
| NFR-U1-3 | カテゴリ正規化マップ（Zaim カテゴリ → 食費/日用品/固定費/その他）+ 単体テスト | SM-2 の±10%を構造化データで担保 | 手動補正ルールのメンテが必要 |
| NFR-U1-4 | Structured Output（JSON schema）で `improvements[]` / `positives[]` 必須 | SM-3 をプログラム検証可能に | プロンプト・スキーマ設計コスト |
| NFR-U1-5 | クライアントサイド永続化 + 要約送信（Summarization Gateway） | 生データの外部永続化を防止 | 要約ロジックの精度に依存 |
| NFR-U1-6 | Server-only Secret（環境変数 `OPENAI_API_KEY`、Route Handler のみ） | クライアント露出防止 | ローカル開発に `.env.local` 必要 |
| NFR-U1-7 | 二重検証（Client 即時 + Server 再検証） | UX とセキュリティの両立 | 検証ロジックの重複 |
| NFR-U1-8 | Storage Adapter with Quota Guard（書き込み前サイズ見積・try/catch） | QuotaExceeded 時の安全な失敗 | 大容量 CSV は取り込み不可 |

## Security Patterns

- **Trust Boundary**: ブラウザ（localStorage, UI）｜Next.js サーバー（Secret, 検証）｜OpenAI API（一時推論のみ）
- **Fail Closed**: API エラー・タイムアウト時は AI 応答を返さず UI にエラー表示。家計データは変更しない
- **Output Encoding**: React JSX エスケープ。AI 応答は構造化 JSON パース後にコンポーネント表示
- **CSRF**: Cookie 認証なし・同一オリジン `fetch` JSON POST。追加 CSRF トークンは MVP 不要
- **SSRF**: OpenAI 公式 SDK の固定エンドポイントのみ。ユーザー入力から URL は生成しない
- **Injection**: CSV は papaparse（構造化パース）。質問文は長さ上限・制御文字除去。プロンプトインジェクション対策は system prompt で役割固定

## 共通方針との差分

なし（tech-stack-baseline v1・known-constraints と一致）
