---
name: aidlc-nfr-design-lite
description: Produces lightweight NFR design patterns and logical components for a Unit when NFRs require design work. Use conditionally after NFR Assessment approval.
---

# AI-DLC NFR Design Lite

## Purpose

Translate approved NFRs into lightweight design patterns and logical components.

## When to Use

Use only when performance, security, availability, accessibility, audit, or other NFRs require explicit design.

## Inputs

- `construction/<unit-id>/nfr-requirements.md`
- `construction/<unit-id>/tech-stack-decisions.md`
- `construction/<unit-id>/functional-design/business-logic-model.md`
- `construction/<unit-id>/functional-design/domain-entities.md`
- `construction/<unit-id>/functional-design/business-rules.md`

## Process

1. Identify which NFRs need design patterns.
2. Define NFR design patterns.
3. Define logical components needed to satisfy the NFRs.
4. Record differences from shared baseline.
5. Request human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
construction/<unit-id>/nfr-design/
├─ nfr-design-patterns.md
└─ logical-components.md
construction/<unit-id>/reviews/nfr-design-review.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `nfr-design-patterns.md`: `nfr-design-patterns-template.md`
- `logical-components.md`: `logical-components-template.md`
- `reviews/nfr-design-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Infrastructure Design or Code Generation until NFR Design is approved.

## Stop Conditions

- NFR Assessment is not approved.
- NFR design introduces unapproved technology choices.
- Review is `Revision Required`.

## Do Not Do

- Do not provision infrastructure.
- Do not write code.
- Do not add dependencies.

## Validation Checklist

Use `docs/aidlc/checklists/nfr-design-checklist.md` and `docs/aidlc/checklists/security-lite-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in the review file's Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

`aidlc-infrastructure-design-lite` if needed; otherwise `aidlc-code-generation-lite`.
