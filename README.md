# AI-DLC Lite MVP Template

This repository is a lightweight MVP template inspired by AWS Labs AI-DLC v2.

It does not copy the full AI-DLC v2 runtime. Instead, it keeps the core ideas:

- staged Product Discovery, Inception, and Construction
- explicit human approval gates
- traceability from hypothesis to implementation unit
- right-sized workflow composition
- clear separation of facts, hypotheses, decisions, and open questions
- stopping before Operations unless humans explicitly decide otherwise

## Purpose

Use this repository as a starter for small Greenfield MVPs.

The intended flow is:

```text
Product Discovery
  ↓
AI-DLC Inception
  ↓
AI-DLC Construction
  ↓
Construction Exit
  ↓
Stop before Operations
```

## How to Use

Start with Product Discovery:

```text
/ux-product-discovery-lite
```

After the Product Hypothesis is approved, continue with Inception:

```text
/aidlc-inception-lite
```

After Inception Exit is approved, continue with Construction:

```text
/aidlc-construction-lite
```

Each phase requires explicit human approval before the next phase begins.

## Repository Structure

```text
.agents/skills/
docs/aidlc/
docs/aidlc/templates/
docs/aidlc/checklists/
docs/aidlc/intents/
.cursor/rules/
```

## Design Principles

This template keeps the AI-DLC v2 design philosophy while staying small enough for Cursor Agent and small MVP work.

It intentionally avoids the initial complexity of:

- Kiro-specific `.kiro/` runtime files
- Subagents
- Hooks
- MCP
- Process Checker
- automatic validation scripts
- Operations automation

## Templates and Runtime Artifacts

Reusable templates live under:

```text
docs/aidlc/templates/
```

Intent-specific artifacts should be generated under:

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
```

Checklists live under:

```text
docs/aidlc/checklists/
```

## Operations Boundary

This template stops at Construction Exit.

It does not perform:

- production deployment
- Terraform Apply
- monitoring setup
- alert setup
- release automation
- secret generation or commit
- Operations Skill execution

Operations requires a separate, explicit human request.

## Future Direction

This repository can evolve into a reusable AI-DLC Lite starter for Cursor, Devin CLI, and Devin Cloud.

Vercel Labs Skills such as `web-design-guidelines`, `react-best-practices`, `composition-patterns`, and `react-view-transitions` can be added later during UI implementation review and React / Next.js construction work.