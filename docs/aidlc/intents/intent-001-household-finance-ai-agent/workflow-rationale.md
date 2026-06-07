# ワークフロー構成の理由

## 含める Skill

| Skill | 理由 | 承認が必要 |
|---|---|---|
| `ux-product-discovery-lite` | 対象ユーザー・課題・仮説・MVP 指標を Inception 前に明確化 | Yes |
| `aidlc-intent-bootstrap-lite` | インテント成果物とトレーサビリティを初期化 | Yes |
| `aidlc-workflow-composition-lite` | AI-DLC v2 の right-sizing を軽量形式で維持 | Yes |
| `aidlc-requirements-analysis-lite` | 検証可能な FR/NFR とスコープを作成 | Yes |
| `aidlc-user-stories-lite` | 承認済み要件をトレーサブルなストーリーに変換 | Yes |
| `aidlc-wireframes-lite` | 設計前に UI フローと画面状態を検証（スマホ Web UI が対象） | Yes |
| `aidlc-application-design-lite` | 軽量な論理設計を作成 | Yes |
| `aidlc-units-generation-lite` | 単一/複数ユニットの判断。初回学習ランで必須 | Yes |

## 省略する Skill / 機能

| Skill / 機能 | 理由 |
|---|---|
| Reverse Engineering | 小規模グリーンフィールド MVP が対象 |
| Construction Skills | 本 Harness は Construction 前に停止 |
| Operations Skills | 初回 Harness の対象外 |
| Vercel Labs Skills | Construction および UI 実装レビュー向けに予約 |
| Subagents / Hooks / Process Checker | 初回 Harness では手動チェックリストで代替 |

## 条件付き Skill

| Skill | 実行条件 |
|---|---|
| `aidlc-units-generation-lite` | 初回学習ランでは常に実行。複数ユニットの可能性がある場合も実行 |

## 承認ゲート

全ステージで人間の明示承認を必須とする。Construction・コード生成・インフラ構築は含めない。
