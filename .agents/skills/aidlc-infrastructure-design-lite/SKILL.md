---
name: aidlc-infrastructure-design-lite
description: Produces lightweight infrastructure design for a Unit when infrastructure decisions are needed. Use conditionally after NFR Assessment or NFR Design approval, without provisioning infrastructure.
---

# AI-DLC Infrastructure Design Lite

## Purpose

Design infrastructure-related requirements without performing provisioning or Operations work.

## When to Use

Use only when the Unit needs deployment design, external API conditions, persistence, environment variables, mock data, fixtures, or local runtime setup.

## Inputs

- `construction/<unit-id>/nfr-requirements.md`
- `construction/<unit-id>/tech-stack-decisions.md`
- `construction/<unit-id>/nfr-design/nfr-design-patterns.md` if present
- `construction/<unit-id>/nfr-design/logical-components.md` if present
- `construction/<unit-id>/functional-design/business-logic-model.md`
- `construction/<unit-id>/functional-design/domain-entities.md`

## Process

1. Define infrastructure design at a lightweight level.
2. Define local environment variable names, purpose, required status, Secret classification, and mock availability.
3. Define external API connection conditions and timeout expectations.
4. Define development mock / fixture needs.
5. Record `.env.example` requirements, but do not create `.env.example`.
6. Request human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
construction/<unit-id>/infrastructure-design/
├─ infrastructure-design.md
└─ deployment-architecture.md
construction/<unit-id>/reviews/infrastructure-design-review.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `infrastructure-design.md`: `infrastructure-design-template.md`
- `deployment-architecture.md`: `deployment-architecture-template.md`
- `reviews/infrastructure-design-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Code Generation until Infrastructure Design is approved when this Skill is used.

## Stop Conditions

- Required environment variables are unclear.
- Secret handling is unsafe.
- External API behavior is unspecified.
- Review is `Revision Required`.

## Do Not Do

- Do not run Terraform Apply.
- Do not deploy to production.
- Do not configure monitoring or alerts.
- Do not generate or commit secrets.
- Do not create `.env.example`; that belongs to Code Generation.

## Validation Checklist

Use `docs/aidlc/checklists/infrastructure-design-checklist.md` and `docs/aidlc/checklists/security-lite-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in the review file's Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

`aidlc-code-generation-lite`
