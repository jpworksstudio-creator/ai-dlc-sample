---
name: aidlc-nfr-assessment-lite
description: Assesses non-functional requirements and technology decisions for a Unit in lightweight AI-DLC Construction. Use after Functional Design approval to create nfr-requirements and tech-stack-decisions.
---

# AI-DLC NFR Assessment Lite

## Purpose

Clarify quality requirements and technology decisions before implementation.

## When to Use

Use for each Unit after Functional Design approval.

## Inputs

- `inception/requirements.md`
- `construction/<unit-id>/functional-design/business-logic-model.md`
- `construction/<unit-id>/functional-design/domain-entities.md`
- `construction/<unit-id>/functional-design/business-rules.md`
- `decisions.md`
- `construction/shared/known-constraints.md`
- `construction/shared/cross-cutting-requirements.md`

## Process

1. Identify Unit-specific NFRs.
2. Record technology decisions and constraints.
3. Consult `docs/aidlc/checklists/security-lite-checklist.md`.
4. If shared baseline files need to be generated or changed, present change content, reason, affected Units, impact on completed Units, and Human Approval Status.
5. Do not update shared baseline until approved.
6. Request human approval for the Unit NFR Assessment.

## Outputs

```text
construction/<unit-id>/nfr-requirements.md
construction/<unit-id>/tech-stack-decisions.md
construction/shared/tech-stack-baseline.md
construction/shared/nfr-baseline.md
construction/shared/cross-cutting-decisions.md
construction/<unit-id>/reviews/nfr-assessment-review.md
```

Shared baseline outputs are created or updated only when approved.

## Human Approval Gate

Do not proceed to NFR Design or Infrastructure Design until NFR Assessment is approved.

## Stop Conditions

- Functional Design is not approved.
- NFRs are not measurable enough for implementation.
- Shared baseline change is needed but not approved.
- Review is `Revision Required`.

## Do Not Do

- Do not lock unknown technology choices before NFR Assessment.
- Do not add dependencies.
- Do not write code.

## Validation Checklist

Use `docs/aidlc/checklists/nfr-assessment-checklist.md` and `docs/aidlc/checklists/security-lite-checklist.md`.

## Next Skill

`aidlc-nfr-design-lite` if NFR patterns are needed; otherwise `aidlc-infrastructure-design-lite` if infrastructure design is needed, or `aidlc-code-generation-lite`.
