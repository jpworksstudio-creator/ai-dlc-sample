---
name: aidlc-intent-bootstrap-lite
description: Initializes lightweight AI-DLC Inception artifacts for an existing discovery intent. Use after Product Hypothesis approval to reuse the provisional intent directory and add workflow, decisions, open questions, traceability, reviews, and inception structure.
---

# AI-DLC Intent Bootstrap Lite

## Purpose

Promote an approved Product Discovery intent into AI-DLC Inception without creating a duplicate intent directory.

## When to Use

Use after Product Hypothesis approval and before workflow composition. The provisional intent directory must already exist from `ux-product-discovery-lite`.

## Inputs

- Existing `docs/aidlc/intents/intent-<nnn>-<slug>/intent.md`
- Existing `docs/aidlc/intents/intent-<nnn>-<slug>/state.md`
- Approved `docs/aidlc/intents/intent-<nnn>-<slug>/product-discovery/product-hypothesis.md`
- `docs/aidlc/intents/intent-<nnn>-<slug>/product-discovery/user-journey.md`

## Process

1. Confirm that `product-discovery/product-hypothesis.md` exists and is approved by the human.
2. Reuse the existing `docs/aidlc/intents/intent-<nnn>-<slug>/` directory. Do not create a new intent directory.
3. Confirm `intent.md` still preserves the original request, summary, slug, and classification.
4. Add or initialize `workflow.md`, `decisions.md`, `open-questions.md`, `traceability.md`, `reviews/`, and `inception/`.
5. Update `state.md` to:
   ```text
   Current Phase: inception
   Current Step: intent-bootstrap
   Status: in-progress
   Product Hypothesis Approval: approved
   ```
6. Keep facts, hypotheses, decisions, and open questions distinct.

## Outputs

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
├─ workflow.md
├─ decisions.md
├─ open-questions.md
├─ traceability.md
├─ reviews/
└─ inception/
```

Create each output from its template in `docs/aidlc/templates/`:

- `workflow.md`: `workflow-template.md`
- `decisions.md`: `decisions-template.md`
- `open-questions.md`: `open-questions-template.md`
- `traceability.md`: `traceability-template.md`
- files under `reviews/`: `review-template.md`

## Human Approval Gate

Ask the human to confirm that the approved Product Hypothesis may be promoted into Inception. Do not proceed to workflow composition until this is confirmed.

## Stop Conditions

- Product Hypothesis is not approved.
- The existing intent directory from Product Discovery cannot be found.
- Intent classification is unclear and affects workflow.
- The human rejects the slug or scope.

## Do Not Do

- Do not create requirements.
- Do not create application design.
- Do not create a duplicate `intent-<nnn>-<slug>` directory.
- Do not create code.
- Do not start Construction.

## Validation Checklist

- Existing Intent ID follows `intent-<nnn>-<slug>`.
- Existing original request is preserved.
- Product Hypothesis Approval is `approved`.
- Classification is stated.
- Initial traceability exists.
- Review result is recorded under `reviews/`.

## Next Skill

`aidlc-workflow-composition-lite`
