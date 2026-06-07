# AI-DLC Upstream Reference

## Repository

https://github.com/awslabs/aidlc-workflows

## Branch

`v2`

## Usage

AWS Labs AI-DLC v2 is used as a reference implementation for the lightweight Cursor Agent Inception Harness.

This Harness preserves the AI-DLC v2 ideas of staged discovery, right-sized workflow composition, traceability, validation, and human approval gates while avoiding Kiro-specific runtime components.

The upstream repository is not copied wholesale. Only approved concepts and patterns are adapted into this project.

## Update Policy

v2 ブランチの最新内容は必要に応じて確認する。
upstream の変更は生成済み Harness へ自動反映しない。
差分を確認し、人間が承認した変更だけを取り込む。

今回は Commit Hash を固定しない。

## Referenced Skills

- `src/skills/aidlc-orchestrator/SKILL.md`
- `src/skills/aidlc-intent-bootstrap/SKILL.md`
- `src/skills/aidlc-workflow-composition/SKILL.md`
- `src/skills/aidlc-requirements-analysis/SKILL.md`
- `src/skills/aidlc-user-stories/SKILL.md`
- `src/skills/aidlc-wireframes/SKILL.md`
- `src/skills/aidlc-application-design/SKILL.md`
- `src/skills/aidlc-units-generation/SKILL.md`
- `src/skills/aidlc-orchestrator/CATALOGUE.md`
- `src/kiro/aidlc-common/protocols/`
- `src/kiro/aidlc-common/conventions/`

## Simplifications

- `.kiro/` 配置を採用せず、共通 Skill の正本を `.agents/skills/` に置く。
- Builder / Validator subagent を分離せず、Cursor Agent が各 Lite Skill を順に実行する。
- Process Checker、Hooks、自動 Validation Script を導入せず、手動 Checklist と Review 記録で代替する。
- 動的 Workflow Composition は `workflow.md` と `workflow-rationale.md` による軽量な right-sizing 記録に縮約する。
- `validation-spec.md` は作らず、各 Skill の `Validation Checklist` と `docs/aidlc/checklists/` で確認する。
- 小規模 Greenfield MVP を対象にし、Reverse Engineering と Brownfield 前提を初回から外す。

## Initially Omitted

- Subagents
- Hooks
- MCP
- Process Checker
- 自動 Validation Script
- Reverse Engineering
- Construction Skills
- Operations Skills
- Vercel Labs Skills のインストール
- アプリケーションコード生成
- ライブラリ追加
- インフラ構成

## Future Candidates

- Review 専用 Skill / Reviewer Subagent
- AI-DLC v2 の Process Checker に相当する状態検証
- Hooks による承認漏れ防止
- MCP による Figma、GitHub、ブラウザテスト、Analytics 連携
- Construction phase の Functional Design / NFR / Code Generation / Build and Test
- Vercel Labs Skills による UI 実装レビューと React / Next.js 品質向上
- Devin CLI / Devin Cloud Adapter
