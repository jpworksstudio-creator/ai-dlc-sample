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

```text
workflow.md
workflow-rationale.md
```

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

## Next Skill

`aidlc-requirements-analysis-lite`
