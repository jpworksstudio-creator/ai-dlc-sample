# AI-DLC Lite MVP Template

AWS Labs AI-DLC v2 の設計思想をベースにした、小規模 Greenfield MVP 開発用の軽量テンプレートです。

AI-DLC v2 のランタイムをそのまま移植するのではなく、次の中核アイデアだけを Cursor Agent で扱いやすい形に縮約しています。

- Product Discovery → Inception → Construction の段階的進行
- すべてのステージに明示的な人間承認ゲート
- 仮説から実装コードまでのトレーサビリティ
- 規模に応じた right-sizing（不要な工程はスキップ）
- 事実・仮説・決定・未解決事項の分離
- Operations 手前での停止（人間が明示的に指示しない限り進まない）

## 全体フロー

```text
/ux-product-discovery-lite
  └─ Product Hypothesis を作成 ──▶ 人間が承認
        ↓
/aidlc-inception-lite
  └─ 要件 → ストーリー → ワイヤーフレーム → 設計 → Unit 分割
     （各ステージで人間が承認） ──▶ Inception Exit を承認
        ↓
/aidlc-construction-lite
  └─ 計画 → Unit ごとに設計・実装・テスト
     （Layer 単位で人間が承認） ──▶ Construction Exit を承認
        ↓
ここで停止（Operations には進まない）
```

## クイックスタート

1. このテンプレートをコピーして新しいリポジトリを作る
2. Cursor のチャットで作りたいプロダクトのアイデアを伝え、`/ux-product-discovery-lite` を実行する
3. 以降は Agent の案内に従い、各ステージの成果物を確認して承認していく

Agent は承認なしに次のステージへ進みません。成果物に問題があれば「Revision Required」と伝えると、そのステージからやり直します。

## フェーズ別ガイド

### 1. Product Discovery（`/ux-product-discovery-lite`）

誰の・どんな課題を・どう解決するかを仮説として固めるフェーズです。

| 成果物 | 内容 |
|---|---|
| `intent.md` | 元の依頼と意図 |
| `product-discovery/product-hypothesis.md` | ターゲットユーザー、課題、最もリスキーな仮説、成功指標 |
| `product-discovery/user-journey.md` | 主要なユーザージャーニー |

**人間が承認するもの:** Product Hypothesis

### 2. Inception（`/aidlc-inception-lite`）

承認済みの仮説を、実装可能な計画に落とすフェーズです。次の順で進みます。

| 順 | Skill | 成果物 | 承認するもの |
|---|---|---|---|
| 1 | `aidlc-intent-bootstrap-lite` | `workflow.md` ほか管理ファイル一式 | Inception への昇格 |
| 2 | `aidlc-workflow-composition-lite` | `workflow.md` `workflow-rationale.md` | 実行する工程・スキップする工程 |
| 3 | `aidlc-requirements-analysis-lite` | `inception/requirements.md` | FR / NFR |
| 4 | `aidlc-user-stories-lite` | `inception/personas.md` `inception/stories.md` | ペルソナとストーリー |
| 5 | `aidlc-wireframes-lite` | `inception/wireframes/`（HTML） | 画面構成・遷移・状態 |
| 6 | `aidlc-application-design-lite` | `inception/application-design.md` | 論理設計 |
| 7 | `aidlc-units-generation-lite` | `inception/units-of-work.md` | Unit 分割と Inception Exit |

**人間が承認するもの:** 各ステージの成果物 + 最後に Inception Exit

### 3. Construction（`/aidlc-construction-lite`）

承認済みの Inception 成果物から、実際にコードを作るフェーズです。

```text
Construction Input Readiness 確認 ──▶ 承認
        ↓
Construction Plan 作成 ──▶ 承認
        ↓
Unit ごとのループ:
  Functional Design ──▶ 承認
  NFR Assessment ──▶ 承認
  （必要なら NFR Design / Infrastructure Design ──▶ 承認）
  Code Generation: 5〜8 ファイルの Layer 単位で実装
    各 Layer ごとに Build / Test ──▶ 承認
  （UI を含む Unit は UI Review ──▶ 承認）
        ↓
Final Integration Validation ──▶ 承認
        ↓
Construction Exit ──▶ 承認して停止
```

**人間が承認するもの:** 計画、各設計、各 Layer の実装、最終統合、Construction Exit

## 成果物の配置

intent ごとの成果物はすべて次のディレクトリに集約されます。

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
├─ intent.md / state.md / workflow.md
├─ decisions.md / open-questions.md / traceability.md
├─ product-discovery/
├─ inception/
├─ construction/
│  ├─ construction-plan.md / state.md
│  ├─ shared/          （Unit 横断の制約・ベースライン）
│  ├─ <unit-id>/       （Unit ごとの設計・Layer・レビュー）
│  └─ reviews/         （Construction 全体のレビュー）
└─ reviews/            （Discovery / Inception のレビュー）
```

アプリケーションコードとテストは、承認済みの `code-generation-plan.md` に従ってリポジトリのソースツリーへ書かれます。

## 承認の仕組み

- 各ステージの承認結果は `reviews/` 配下の review ファイルに記録されます（`Approved` / `Revision Required`）
- `Approved` がない状態で Agent が次のステージへ進むことは禁止されています
- 手動確認の観点は `docs/aidlc/checklists/` のチェックリストにまとまっています

## リポジトリ構成

```text
.agents/skills/        Skill 定義（フェーズごとの手順・停止条件・禁止事項）
.cursor/rules/         Cursor 用エントリルール
docs/aidlc/templates/  成果物のテンプレート
docs/aidlc/checklists/ 人間承認用チェックリスト
docs/aidlc/intents/    intent ごとの成果物（実行時に生成）
docs/aidlc/            ハーネスの設計ドキュメント
```

## 設計原則（軽量化の方針)

AI-DLC v2 の設計思想を保ちつつ、初期構成では次を意図的に省いています。

- Kiro 固有の `.kiro/` ランタイム
- Subagents / Hooks / MCP / Process Checker
- 自動 Validation スクリプト
- Operations の自動化

詳細は `docs/aidlc/UPSTREAM.md` と `docs/aidlc/CONSTRUCTION-HARNESS.md` を参照してください。

## Operations 境界

このテンプレートは Construction Exit で停止します。次の作業は行いません。

- 本番デプロイ
- Terraform Apply
- モニタリング・アラート設定
- リリース自動化
- シークレットの生成・コミット

Operations は、人間による別途の明示的な依頼が必要です。
