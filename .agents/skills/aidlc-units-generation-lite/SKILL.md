---
name: aidlc-units-generation-lite
description: Decides whether a small Greenfield MVP should remain a single unit of work or split into multiple units. Use after application design approval, and always run during the first learning pass to record the unit decision.
---

# AI-DLC Units Generation Lite

## Purpose

Prepare a lightweight Unit of Work decision for Construction without starting Construction.

## When to Use

Normally use conditionally when multiple units may be needed. During the first learning run, always use it and record why a single unit is sufficient if applicable.

## Inputs

- `inception/requirements.md`
- `inception/stories.md`
- `inception/wireframes/screen-structure.md`
- `inception/application-design.md`
- `traceability.md`

## Process

1. Decide whether a single unit is sufficient or multiple units are needed.
2. Consider independent user value, Feature Area, Domain Boundary, deployment unit, team ownership, and operational responsibility.
3. Define each Unit of Work and the user value it provides.
4. Map stories to units.
5. Identify unit dependencies.
6. Define completion conditions that could be handed to Construction later.
7. Update `traceability.md` from Screen to Unit of Work.
8. Ask for human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
inception/units-of-work.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `units-of-work.md`: `units-of-work-template.md`
- `reviews/units-review.md` and `reviews/inception-exit-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Inception Exit until the unit decision is approved.

Record review result under:

```text
reviews/units-review.md
```

## Stop Conditions

- Unit decision is not approved.
- Story to Unit mapping is incomplete.
- Multiple units are proposed without a clear dependency rationale.
- Construction completion conditions are missing.

## Do Not Do

- Do not start Construction.
- Do not assign implementation tasks.
- Do not create code.
- Do not create infrastructure.

## Validation Checklist

Use `docs/aidlc/checklists/units-checklist.md`.

## Next Skill

Run `docs/aidlc/checklists/inception-exit-checklist.md`, create `reviews/inception-exit-review.md`, then stop before Construction.
