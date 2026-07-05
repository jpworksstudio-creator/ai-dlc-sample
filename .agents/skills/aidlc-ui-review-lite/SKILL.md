---
name: aidlc-ui-review-lite
description: Reviews implemented UI against approved stories, wireframes, states, responsive behavior, accessibility, and lightweight web design guidelines. Use only for Units or Layers with UI changes.
---

# AI-DLC UI Review Lite

## Purpose

Verify that implemented UI matches approved Inception and Construction artifacts.

## When to Use

Use only when a Unit or Layer changes UI.

## Inputs

- `inception/stories.md`
- `inception/wireframes/`
- `construction/<unit-id>/CODE_SUMMARY.md`
- Implemented UI diff summary
- Relevant NFRs and accessibility requirements

## Process

1. Compare UI implementation with approved stories and wireframes.
2. Check Loading, Empty, Error, Success, Validation Error, Permission Denied, and Mobile states.
3. Check accessibility and relevant web design guidance.
4. Consult `docs/aidlc/checklists/security-lite-checklist.md` for UI-adjacent risks such as output encoding and error exposure.
5. Record findings and request human approval.
6. After approval, mark Current Unit Complete. Do not jump directly to Construction Exit.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
construction/<unit-id>/ui-review.md          (findings report)
construction/<unit-id>/reviews/ui-review.md  (human approval record)
```

Create each output from its template in `docs/aidlc/templates/`:

- `ui-review.md`: `ui-review-template.md`
- `reviews/ui-review.md`: `review-template.md`

## Human Approval Gate

Do not mark the Unit complete until UI Review is approved.

## Stop Conditions

- UI diverges from approved stories or wireframes.
- Required states are missing.
- Accessibility issues block approval.
- Review is `Revision Required`.

## Do Not Do

- Do not install Vercel Labs Skills in the initial Harness.
- Do not redesign UI beyond approved artifacts.
- Do not start Operations.

## Validation Checklist

Use `docs/aidlc/checklists/ui-review-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in `reviews/ui-review.md` under the Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

If incomplete Units exist, return to the next Unit. If all Units are complete, run Final Integration Validation.
