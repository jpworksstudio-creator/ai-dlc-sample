# Infrastructure Design Checklist

## 確認項目

- [ ] `infrastructure-design.md` がある
- [ ] `deployment-architecture.md` がある
- [ ] 環境変数の名前、用途、必須性、Secret 区分、Mock 可否がある
- [ ] 外部 API 接続条件がある
- [ ] Timeout がある
- [ ] Mock / Fixture がある
- [ ] `.env.example` の実ファイル生成は Code Generation に残している
- [ ] 秘密情報が含まれていない

## 未解決なら停止する条件

- Infrastructure Design が未承認である
- Secret の扱いが不明である
- 本番デプロイや Provisioning に進みそうである

## 人間の承認欄

Status: Approved / Revision Required

承認日時:

Reviewer:

Remaining Issues:

Notes:
