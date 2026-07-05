---
name: aidlc-workflow-composition-lite
description: Composes a right-sized lightweight AI-DLC Inception workflow for small Greenfield MVPs. Use to decide included, skipped, and conditional skills before requirements analysis.
---

# AI-DLC Workflow Composition Lite

## Purpose

Preserve AI-DLC v2 right-sizing while avoiding dynamic orchestration, subagents, hooks, and process checking.

## When to Use

Use after intent bootstrap and before requirements analysis.

## Inputs

- `intent.md`
- `product-discovery/product-hypothesis.md`
- `product-discovery/user-journey.md`
- Existing decisions and open questions

## Process

1. List the skills to execute.
2. List skipped skills and why they are skipped.
3. List conditional skills and their execution conditions.
4. Confirm execution order.
5. Confirm every stage requires human approval.
6. Record rationale in `workflow-rationale.md`.
7. Ask the human to approve the workflow.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
workflow.md
workflow-rationale.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `workflow.md`: `workflow-template.md`
- `workflow-rationale.md`: `workflow-rationale-template.md`
- `reviews/workflow-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Requirements Analysis until the workflow is approved.

Record review result under:

```text
reviews/workflow-review.md
```

## Stop Conditions

- Workflow is not approved.
- Construction, Operations, code generation, or infrastructure work appears in the workflow.
- A required approval gate is missing.

## Do Not Do

- Do not run skipped skills.
- Do not dynamically insert Construction steps.
- Do not install external Skills.
- Do not write application code.

## Validation Checklist

Use `docs/aidlc/checklists/workflow-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in the review file's Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

`aidlc-requirements-analysis-lite`
