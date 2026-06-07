---
name: aidlc-construction-input-readiness-lite
description: Checks whether approved Inception outputs are sufficient for lightweight AI-DLC Construction. Use immediately after Construction starts and before creating the Construction Plan.
---

# AI-DLC Construction Input Readiness Lite

## Purpose

Validate that Inception outputs contain enough information to begin Construction safely.

## When to Use

Use immediately after `aidlc-construction-lite` confirms Inception Exit approval.

## Inputs

- `inception/requirements.md`
- `inception/stories.md`
- `inception/application-design.md`
- `inception/units-of-work.md`
- `traceability.md`

## Process

1. Check Components, Responsibilities, Dependencies, Services, Cross-cutting Concerns, Data Model, API Overview, and External Dependencies.
2. Check Unit ID, Unit-to-Story mapping, Unit-to-Requirement mapping, Unit user value, Unit dependencies, and completion conditions.
3. Record gaps in `construction/construction-input-readiness.md`.
4. If required information is missing, stop and request Inception revision. Do not infer missing design details.

## Outputs

```text
construction/construction-input-readiness.md
construction/reviews/construction-input-review.md
```

## Human Approval Gate

Construction Plan must not be created until this review is `Approved`.

## Stop Conditions

- Required Inception artifacts are missing.
- Unit mapping is incomplete.
- Completion conditions are unclear.
- The human marks readiness as `Revision Required`.

## Do Not Do

- Do not fill gaps by guessing.
- Do not create code.
- Do not start Unit work.
- Do not start Operations.

## Validation Checklist

Use `docs/aidlc/checklists/construction-input-readiness-checklist.md`.

## Next Skill

`aidlc-construction-lite` creates `construction/construction-plan.md` after approval.
