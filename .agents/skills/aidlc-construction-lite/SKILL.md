---
name: aidlc-construction-lite
description: Orchestrates lightweight AI-DLC Construction for approved Inception outputs. Use after Inception Exit approval to plan units, enforce human gates, coordinate layer-based implementation, run final integration validation, and stop before Operations.
---

# AI-DLC Construction Lite

## Purpose

Coordinate Construction for a small MVP from approved Inception outputs to Construction Exit, without entering Operations.

## When to Use

Use only after `reviews/inception-exit-review.md` is `Approved`.

## Inputs

- `inception/requirements.md`
- `inception/stories.md`
- `inception/application-design.md`
- `inception/units-of-work.md`
- `traceability.md`
- `reviews/inception-exit-review.md`

## Process

1. Confirm Inception Exit approval.
2. Set `Current Phase: construction` in the intent-level `state.md`. Track detailed Unit and Layer progress only in `construction/state.md`.
3. Run `aidlc-construction-input-readiness-lite`.
4. After readiness approval, create `construction/construction-plan.md`.
5. Require Construction Plan Approval before Unit work.
6. Initialize `construction/shared/known-constraints.md` and `construction/shared/cross-cutting-requirements.md`.
7. Run each Unit in the order approved in `construction/construction-plan.md`.
8. Track Current Unit, Current Layer, Completed Units, Pending Units, Shared Baseline Version, Conditional Skills Skipped, and Approval Status in `construction/state.md`.
9. After all Units complete, run Final Integration Validation via `aidlc-build-and-test-lite`.
10. After Final Integration approval, run Construction Exit: verify `docs/aidlc/checklists/construction-exit-checklist.md`, confirm `traceability.md` connects Hypothesis through Unit of Work to implemented Layers, create `construction/construction-exit.md`, and request human approval in `construction/reviews/construction-exit-review.md`.
11. After Construction Exit approval, update the intent-level `state.md` Status and stop. Do not start Operations.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
construction/construction-plan.md
construction/state.md
construction/shared/known-constraints.md
construction/shared/cross-cutting-requirements.md
construction/construction-exit.md
construction/reviews/construction-plan-review.md
construction/reviews/construction-exit-review.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `construction-plan.md`: `construction-plan-template.md`
- `state.md`: `construction-state-template.md`
- `shared/known-constraints.md`: `known-constraints-template.md`
- `shared/cross-cutting-requirements.md`: `cross-cutting-requirements-template.md`
- `construction-exit.md`: `construction-exit-template.md`
- review files: `review-template.md`

## Human Approval Gate

Do not start Unit work until Construction Plan is approved.

Do not declare Construction complete until `construction/reviews/construction-exit-review.md` is `Approved`.

## Stop Conditions

- Inception Exit is not approved.
- Construction Input Readiness is not approved.
- Construction Plan is not approved.
- Any stage review is `Revision Required`.
- Operations work is requested.

## Do Not Do

- Do not start Operations.
- Do not deploy to production.
- Do not provision infrastructure.
- Do not add Subagents, Hooks, MCP, or Process Checker.
- Do not continue to the next stage without human approval.

## Validation Checklist

Use `docs/aidlc/checklists/construction-plan-checklist.md` for the plan and `docs/aidlc/checklists/construction-exit-checklist.md` at Construction Exit.

## Next Skill

`aidlc-construction-input-readiness-lite`
