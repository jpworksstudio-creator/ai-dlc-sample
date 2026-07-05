---
name: aidlc-inception-lite
description: Orchestrates lightweight AI-DLC Inception for small Greenfield MVPs after Product Hypothesis approval. Use to guide requirements, stories, HTML wireframes, application design, unit decisions, and stop before Construction.
---

# AI-DLC Inception Lite

## Purpose

Drive AI-DLC Inception from an approved Product Hypothesis to Construction-ready planning artifacts, then stop before Construction.

## When to Use

Use only after `ux-product-discovery-lite` has produced an approved Product Hypothesis.

## Inputs

- Approved `product-discovery/product-hypothesis.md`
- `product-discovery/user-journey.md`
- Existing `intent.md`, `state.md`, `workflow.md`, `decisions.md`, `open-questions.md`, and `traceability.md` if already initialized

## Process

1. Confirm Product Hypothesis approval.
2. Run or guide the following skills in order: `aidlc-intent-bootstrap-lite`, `aidlc-workflow-composition-lite`, `aidlc-requirements-analysis-lite`, `aidlc-user-stories-lite`, `aidlc-wireframes-lite`, `aidlc-application-design-lite`, `aidlc-units-generation-lite`.
3. After each stage, update `state.md`, `decisions.md`, `open-questions.md`, and `traceability.md` as needed.
4. Require a review file in `reviews/` before starting the next stage.
5. Run the Inception Exit review and stop.

## Outputs

Coordinates the runtime intent structure under:

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
```

## Human Approval Gate

Every stage must be explicitly approved by the human before the next stage starts.

## Stop Conditions

- Product Hypothesis is not approved.
- A stage review status is `Revision Required`.
- An open question blocks the next stage.
- Inception Exit is reached.

## Do Not Do

- Do not approve Product Hypothesis on behalf of the human.
- Do not finalize requirements without approval.
- Do not write code.
- Do not add libraries.
- Do not create infrastructure.
- Do not proceed to Construction within this Skill; after Inception Exit approval, Construction starts separately with `aidlc-construction-lite`.

## Validation Checklist

Use each stage checklist, then use `docs/aidlc/checklists/inception-exit-checklist.md`.

At every gate, the executing Skill self-reviews its checklist and records per-item results in the review file's Agent Self-Review section before requesting human approval. Present only `Concern` and `Fail` items to the human. Self-review never replaces human approval.

## Next Skill

Start with `aidlc-intent-bootstrap-lite`, unless intent artifacts already exist and are approved.
