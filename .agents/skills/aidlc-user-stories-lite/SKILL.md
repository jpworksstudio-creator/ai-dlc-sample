---
name: aidlc-user-stories-lite
description: Converts approved lightweight requirements into personas and traceable user stories for a small Greenfield MVP. Use after requirements approval to create S-* stories with Given/When/Then acceptance criteria and UI need classification.
---

# AI-DLC User Stories Lite

## Purpose

Decompose approved requirements into personas and stories that can drive wireframes and design.

## When to Use

Use only after `inception/requirements.md` is approved.

## Inputs

- `inception/requirements.md`
- `product-discovery/user-journey.md`
- `traceability.md`
- `open-questions.md`

## Process

1. Identify domain-grounded personas.
2. Create stories with `S-*` IDs.
3. Use Given / When / Then acceptance criteria.
4. Trace each story to `FR-*` and `NFR-*`.
5. Mark whether each story requires UI.
6. Update `traceability.md` from Requirement to User Story.
7. Ask for human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
inception/personas.md
inception/stories.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `personas.md`: `personas-template.md`
- `stories.md`: `stories-template.md`
- `reviews/user-stories-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Wireframes until stories are approved.

Record review result under:

```text
reviews/user-stories-review.md
```

## Stop Conditions

- Stories are not approved.
- Acceptance criteria are not verifiable.
- FR/NFR traceability is missing.
- UI stories are not identifiable.

## Do Not Do

- Do not add functionality that is not in approved requirements.
- Do not create wireframes yet.
- Do not write code.
- Do not start Construction.

## Validation Checklist

Use `docs/aidlc/checklists/user-stories-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in the review file's Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

`aidlc-wireframes-lite`
