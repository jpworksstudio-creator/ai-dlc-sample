---
name: aidlc-code-generation-lite
description: Generates application code and tests in small approved layers for lightweight AI-DLC Construction. Use after design approval, with each layer limited to about 5-8 files and gated by human checkpoints.
---

# AI-DLC Code Generation Lite

## Purpose

Implement approved Construction design in small, reviewable Layers.

## When to Use

Use only after required Functional Design, NFR Assessment, optional NFR Design, and optional Infrastructure Design are approved.

## Inputs

- `construction/<unit-id>/functional-design/`
- `construction/<unit-id>/nfr-requirements.md`
- `construction/<unit-id>/tech-stack-decisions.md`
- `construction/<unit-id>/nfr-design/` if present
- `construction/<unit-id>/infrastructure-design/` if present
- `construction/construction-plan.md`

## Process

1. Create `code-generation-plan.md` and request approval.
2. Split implementation into Layers of about 5-8 files.
3. For each Layer: implement only the approved scope, create or update tests, and prepare `diff-summary.md`.
4. If `.env.example` is needed, generate it from approved Infrastructure Design without secrets.
5. Stop after each Layer for Build/Test and Human Checkpoint.
6. Update `CODE_SUMMARY.md` after approved Layers.

## Outputs

```text
construction/<unit-id>/code-generation-plan.md
construction/<unit-id>/CODE_SUMMARY.md
construction/<unit-id>/layers/<layer-id>/diff-summary.md
construction/<unit-id>/layers/<layer-id>/review.md
```

## Human Approval Gate

Do not implement any Layer until the Code Generation Plan is approved. Do not proceed to the next Layer until the current Layer checkpoint is approved.

## Stop Conditions

- Code Generation Plan is not approved.
- Layer exceeds the approved scope.
- More than 5-8 files are needed and the human has not approved a larger Layer.
- Build/Test fails and no fix is approved.

## Do Not Do

- Do not implement unapproved requirements.
- Do not include secrets in `.env.example`.
- Do not deploy.
- Do not start Operations.

## Validation Checklist

Use `docs/aidlc/checklists/code-generation-checklist.md` and `docs/aidlc/checklists/security-lite-checklist.md`.

## Next Skill

`aidlc-build-and-test-lite`
