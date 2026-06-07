---
name: aidlc-build-and-test-lite
description: Runs lightweight Build and Test validation after each implementation Layer, at Unit completion, and after all Units. This is a Lite Harness extension because the official AI-DLC v2 Catalogue lists the stage but no official implementation is present.
---

# AI-DLC Build and Test Lite

## Purpose

Validate each Layer, each Unit, and the final integrated repository before Construction Exit.

## When to Use

Use after each `aidlc-code-generation-lite` Layer, at Unit completion, and after all Units are complete.

## Inputs

- Current Layer diff
- `construction/<unit-id>/layers/<layer-id>/diff-summary.md`
- `construction/<unit-id>/CODE_SUMMARY.md`
- Existing project scripts and test commands

## Process

1. For each Layer, run or plan Lint, Type Check, Test, and Build as applicable.
2. Record the Layer result in `layers/<layer-id>/build-and-test-report.md`.
3. At Unit completion, run Unit-level validation and write `construction/<unit-id>/build-and-test-report.md`.
4. After all Units complete, run Final Integration Validation and write `construction/final-integration-report.md`.
5. Request human approval for reports.

## Outputs

```text
construction/<unit-id>/layers/<layer-id>/build-and-test-report.md
construction/<unit-id>/build-and-test-report.md
construction/final-integration-report.md
```

## Human Approval Gate

Do not proceed past a Layer, Unit, or Final Integration checkpoint until the relevant report is approved.

## Stop Conditions

- Lint, Type Check, Test, or Build fails.
- Required scripts are missing and no alternative is approved.
- Human marks the report `Revision Required`.

## Do Not Do

- Do not skip failed checks.
- Do not force changes beyond the approved Layer.
- Do not deploy.
- Do not start Operations.

## Validation Checklist

Use `docs/aidlc/checklists/build-and-test-checklist.md` and `docs/aidlc/checklists/final-integration-checklist.md` when applicable.

## Next Skill

`aidlc-ui-review-lite` if UI was implemented; otherwise continue Unit loop or Construction Exit after Final Integration approval.
