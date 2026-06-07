# Construction 以降の追加候補

この Harness は Inception で停止する。以下は Construction 以降に、必要性を確認してから追加する候補。

| 候補 | 目的 | 追加タイミング |
|---|---|---|
| Reviewer Skill | Inception 成果物、設計、PR のレビュー観点を標準化する | 成果物レビューの負荷が増えた時 |
| Reviewer Subagent | 作成者と独立した観点でレビューする | 並列レビューや独立評価が必要になった時 |
| Hooks | 承認漏れ、Checklist 未確認、状態更新漏れを防ぐ | 手動運用で漏れが出た時 |
| Process Checker | Skill 状態遷移と成果物の整合性を機械的に確認する | 複数 intent / 複数人運用になった時 |
| MCP | Figma、GitHub、ブラウザ、Analytics、Issue Tracker と接続する | 外部システム連携が必要になった時 |
| Construction Skills | Functional Design、NFR、Code Generation、Build and Test を進める | Inception Exit が承認された後 |
| Operations Skills | 運用、監視、改善サイクルを扱う | MVP が運用に乗った後 |
| Devin CLI Adapter | `.agents/skills/` を Devin CLI から利用しやすくする | Skill 群が安定し、自動実行したくなった時 |
| Devin Cloud Adapter | Devin Cloud 上で同じ Inception / Construction フローを動かす | クラウド実行や長時間タスク移譲が必要になった時 |
| Vercel Labs `web-design-guidelines` | 実装済み UI の a11y、UX、Web Interface Guidelines を監査する | UI 実装後、QA 前、PR 前 |
| Vercel Labs `react-best-practices` | React / Next.js のパフォーマンスと実装品質を確認する | React / Next.js 実装開始時 |
| Vercel Labs `composition-patterns` | UI component API と構成を改善する | component 設計やリファクタ時 |
| Vercel Labs `react-view-transitions` | View Transition API による画面遷移を実装する | 遷移アニメーションが FR / NFR に入った時 |

## 初回 Harness での扱い

- Vercel Labs Skills はインストールしない。
- `web-design-guidelines` の関連観点は `docs/aidlc/checklists/wireframes-checklist.md` に反映する。
- React / Next.js 実装品質に関する Skill は Construction 以降に追加する。
