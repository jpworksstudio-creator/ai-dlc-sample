# Security Lite Checklist

## 確認項目

- [ ] 入力検証がある
- [ ] 認証・認可の境界が明確である
- [ ] Secret を生成・記録・Commit していない
- [ ] エラー情報が過剰に露出しない
- [ ] 外部 API Timeout がある
- [ ] 依存パッケージ追加の必要性が説明されている
- [ ] 依存パッケージ追加が承認されている
- [ ] ログへ機密情報を出力しない
- [ ] Trust Boundary が明示されている
- [ ] Output Encoding が必要な箇所を確認した
- [ ] Fail Closed の方針がある
- [ ] CSRF の要否を確認した
- [ ] SSRF の要否を確認した
- [ ] Injection のリスクを確認した

## 未解決なら停止する条件

- Secret が成果物や Git に含まれる
- 認証・認可が曖昧である
- 外部入力の検証がない
- 依存パッケージ追加が未承認である

## 人間の承認欄

Status: Approved / Revision Required

承認日時:

Reviewer:

Remaining Issues:

Notes:
