---
name: aidlc-requirements-analysis-lite
description: Produces lightweight AI-DLC requirements for a small Greenfield MVP. Use after workflow approval to create verifiable FR/NFR, facts, hypotheses, assumptions, decisions, open questions, success metrics, and out-of-scope items.
---

# AI-DLC Requirements Analysis Lite

## Purpose

Turn the approved Product Hypothesis and intent into verifiable MVP requirements.

## When to Use

Use after workflow approval. Do not use if the Product Hypothesis or workflow is unapproved.

## Inputs

- `intent.md`
- `product-discovery/product-hypothesis.md`
- `product-discovery/user-journey.md`
- `workflow.md`
- `decisions.md`
- `open-questions.md`

## Process

1. Summarize the intent.
2. Write Functional Requirements as `FR-*`.
3. Write Non-Functional Requirements as `NFR-*`.
4. Record Facts, Hypotheses, Assumptions, Decisions, Open Questions, Success Metrics, and Out of Scope.
5. Make requirements pass/fail verifiable where possible.
6. Ask at most 5 clarification questions at a time.
7. Update `traceability.md` from Hypothesis and Success Metric to Requirement.
8. Ask for human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
inception/requirements.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `requirements.md`: `requirements-template.md`
- `reviews/requirements-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to User Stories until requirements are approved.

Record review result under:

```text
reviews/requirements-review.md
```

## Stop Conditions

- Requirements are not approved.
- FR/NFR are vague or not testable.
- Critical Open Questions remain.
- Unapproved hypotheses are treated as requirements.

## Do Not Do

- Do not create stories.
- Do not create wireframes.
- Do not select frameworks, libraries, cloud services, databases, or protocols.
- Do not write application code.

## Validation Checklist

Use `docs/aidlc/checklists/requirements-checklist.md`.

## Next Skill

`aidlc-user-stories-lite`
