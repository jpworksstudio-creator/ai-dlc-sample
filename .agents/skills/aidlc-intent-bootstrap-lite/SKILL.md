---
name: aidlc-intent-bootstrap-lite
description: Initializes lightweight AI-DLC intent artifacts for a small Greenfield MVP. Use at the start of Inception to create intent, state, workflow, decisions, open questions, and traceability structure.
---

# AI-DLC Intent Bootstrap Lite

## Purpose

Create the initial intent record and lightweight AI-DLC document set for one MVP intent.

## When to Use

Use after Product Hypothesis approval and before workflow composition.

## Inputs

- Original user request
- Approved `product-discovery/product-hypothesis.md`
- `product-discovery/user-journey.md`
- Desired slug if provided by the human

## Process

1. Choose the next `intent-<nnn>-<slug>` identifier.
2. Record the original request verbatim.
3. Summarize the intent.
4. Classify as Greenfield / Brownfield / Mixed. Initial target is small Greenfield MVP.
5. Initialize state, workflow, decisions, open questions, and traceability.
6. Keep facts, hypotheses, decisions, and open questions distinct.

## Outputs

```text
intent.md
state.md
workflow.md
decisions.md
open-questions.md
traceability.md
```

Use templates from `docs/aidlc/templates/`.

## Human Approval Gate

Ask the human to confirm the intent ID, slug, classification, and initial scope before workflow composition.

## Stop Conditions

- Product Hypothesis is not approved.
- Intent classification is unclear and affects workflow.
- The human rejects the slug or scope.

## Do Not Do

- Do not create requirements.
- Do not create application design.
- Do not create code.
- Do not start Construction.

## Validation Checklist

- Intent ID follows `intent-<nnn>-<slug>`.
- Original request is preserved.
- Classification is stated.
- Initial traceability exists.
- Review result is recorded under `reviews/`.

## Next Skill

`aidlc-workflow-composition-lite`
