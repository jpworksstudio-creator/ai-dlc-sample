---
name: ux-product-discovery-lite
description: Runs lightweight Product Discovery before AI-DLC Inception for small Greenfield MVPs. Use when clarifying target users, problems, hypotheses, success metrics, user journeys, and MVP scope before requirements work.
---

# UX Product Discovery Lite

## Purpose

Clarify who the MVP serves, what problem it solves, and which product hypothesis should be approved before AI-DLC Inception begins.

## When to Use

Use this before `aidlc-inception-lite` for a new small Greenfield MVP. Do not mix unapproved hypotheses into requirements.

## Inputs

- Original product idea or user request
- Any known customer, workflow, domain, or business context
- Existing decisions or constraints volunteered by the human

## Process

1. Initialize a provisional intent directory under `docs/aidlc/intents/intent-<nnn>-<slug>/`.
2. Create the minimum discovery-time files: `intent.md`, `state.md`, `product-discovery/product-hypothesis.md`, and `product-discovery/user-journey.md`.
3. Set `state.md` to:
   ```text
   Current Phase: product-discovery
   Status: in-progress
   Product Hypothesis Approval: pending
   ```
4. Capture the target user, current behavior, pain point, current alternatives, ideal experience, primary user journey, riskiest hypothesis, success metrics, and out-of-scope experiences.
5. Separate `Facts`, `Hypotheses`, `Decisions`, and `Open Questions`.
6. Ask only questions that materially affect Product Hypothesis quality. Ask at most 5 questions at a time.
7. Ask the human to approve the Product Hypothesis.

## Outputs

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
├─ intent.md
├─ state.md
└─ product-discovery/
   ├─ product-hypothesis.md
   └─ user-journey.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `intent.md`: `intent-template.md`
- `state.md`: `state-template.md`
- `product-hypothesis.md`: `product-hypothesis-template.md`
- `user-journey.md`: `user-journey-template.md`

## Human Approval Gate

Do not proceed to AI-DLC Inception until the human explicitly approves `product-hypothesis.md`.

During Product Discovery, record the approval status in `state.md` and `product-discovery/product-hypothesis.md`. Do not create `reviews/` yet; `aidlc-intent-bootstrap-lite` initializes `reviews/` after Product Hypothesis approval.

## Stop Conditions

- The target user is unclear.
- The riskiest hypothesis is not stated.
- Success metrics are missing or not measurable.
- Product Hypothesis status is not `Approved`.

## Do Not Do

- Do not create requirements.
- Do not create wireframes.
- Do not start AI-DLC Inception.
- Do not create `workflow.md`, `decisions.md`, `open-questions.md`, `traceability.md`, `reviews/`, or `inception/`; those are initialized by `aidlc-intent-bootstrap-lite` after Product Hypothesis approval.
- Do not treat hypotheses as facts.
- Do not write application code.

## Validation Checklist

Use `docs/aidlc/checklists/product-discovery-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result under an `Agent Self-Review` heading in `product-discovery/product-hypothesis.md` as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

After Product Hypothesis approval, run `aidlc-inception-lite`.
