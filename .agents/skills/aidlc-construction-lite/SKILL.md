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
2. Run `aidlc-construction-input-readiness-lite`.
3. After readiness approval, create `construction/construction-plan.md`.
4. Require Construction Plan Approval before Unit work.
5. Initialize `construction/shared/known-constraints.md` and `construction/shared/cross-cutting-requirements.md`.
6. Run each Unit in the order approved in `construction/construction-plan.md`.
7. Track Current Unit, Current Layer, Completed Units, Pending Units, Shared Baseline Version, Conditional Skills Skipped, and Approval Status in `construction/state.md`.
8. After all Units complete, run Final Integration Validation.
9. Stop at Construction Exit.

## Outputs

```text
construction/construction-plan.md
construction/state.md
construction/shared/known-constraints.md
construction/shared/cross-cutting-requirements.md
construction/reviews/construction-plan-review.md
```

## Human Approval Gate

Do not start Unit work until Construction Plan is approved.

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

Use `docs/aidlc/checklists/construction-plan-checklist.md`.

## Next Skill

`aidlc-construction-input-readiness-lite`
