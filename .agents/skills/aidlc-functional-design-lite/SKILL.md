---
name: aidlc-functional-design-lite
description: Produces per-unit functional design artifacts for lightweight AI-DLC Construction. Use after Construction Plan approval to define business logic, domain entities, and business rules before NFR assessment.
---

# AI-DLC Functional Design Lite

## Purpose

Define Unit-specific functional behavior while preserving the official AI-DLC v2 artifact boundary.

## When to Use

Use for each approved Unit before NFR Assessment.

## Inputs

- `inception/requirements.md`
- `inception/stories.md`
- `inception/application-design.md`
- `inception/units-of-work.md`
- `construction/construction-plan.md`

## Process

1. Select the current Unit ID from `construction/construction-plan.md`.
2. Define business logic model for the Unit.
3. Define domain entities owned or used by the Unit.
4. Define business rules and edge cases.
5. Record differences from shared constraints.
6. Request human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
construction/<unit-id>/functional-design/
├─ business-logic-model.md
├─ domain-entities.md
└─ business-rules.md
construction/<unit-id>/reviews/functional-design-review.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `business-logic-model.md`: `business-logic-model-template.md`
- `domain-entities.md`: `domain-entities-template.md`
- `business-rules.md`: `business-rules-template.md`
- `reviews/functional-design-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to NFR Assessment until Functional Design is approved.

## Stop Conditions

- Unit ID is missing.
- Stories or requirements are not traceable.
- Business rules are incomplete.
- Review is `Revision Required`.

## Do Not Do

- Do not write code.
- Do not choose infrastructure.
- Do not change shared baseline without approval.

## Validation Checklist

Use `docs/aidlc/checklists/functional-design-checklist.md`.

## Next Skill

`aidlc-nfr-assessment-lite`
