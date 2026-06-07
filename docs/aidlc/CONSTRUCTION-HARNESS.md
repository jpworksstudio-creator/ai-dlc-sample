# AI-DLC Construction Harness

## Scope

This Harness starts only after Inception Exit is approved. It supports lightweight AI-DLC Construction for small MVPs and stops at Construction Exit.

## Entry Condition

- `reviews/inception-exit-review.md` is `Approved`.
- Inception artifacts exist under `inception/`.
- `traceability.md` is connected through Unit of Work.

## Execution Boundary

Construction may create or update application code only through approved `aidlc-code-generation-lite` Layer checkpoints. Each Layer should be about 5-8 files unless the human approves a larger Layer.

## Official AI-DLC v2 Artifact Boundary

Functional Design, NFR Design, and Infrastructure Design keep separate artifacts:

```text
construction/<unit-id>/
├─ functional-design/
│  ├─ business-logic-model.md
│  ├─ domain-entities.md
│  └─ business-rules.md
├─ nfr-requirements.md
├─ tech-stack-decisions.md
├─ nfr-design/
│  ├─ nfr-design-patterns.md
│  └─ logical-components.md
├─ infrastructure-design/
│  ├─ infrastructure-design.md
│  └─ deployment-architecture.md
├─ code-generation-plan.md
└─ CODE_SUMMARY.md
```

Conditional Skill outputs are omitted when the corresponding Skill is skipped.

## Review Storage

Global reviews live under:

```text
construction/reviews/
```

Unit-specific reviews live under:

```text
construction/<unit-id>/reviews/
```

Layer-specific human checkpoints live under:

```text
construction/<unit-id>/layers/<layer-id>/review.md
```

## Operations Stop Rule

After Construction Exit approval, do not proceed to Operations.

Do not perform:

- Production deployment
- Terraform Apply
- Monitoring setup
- Alert setup
- Release automation
- Secret generation or commit
- Operations Skill execution

Operations requires a separate, explicit human request.
