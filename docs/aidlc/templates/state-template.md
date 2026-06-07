# State

## Intent

- Intent ID:
- Slug:
- Created At:
- Updated At:

## Current Phase

Current Phase: product-discovery / inception / stopped-before-construction

Current Step: product-discovery / intent-bootstrap / workflow-composition / requirements-analysis / user-stories / wireframes / application-design / units-generation / inception-exit

Status: not-started / in-progress / approved / revision-required / stopped

Product Hypothesis Approval: pending / approved / revision-required

## Discovery Initial State

When `ux-product-discovery-lite` starts, initialize `state.md` with:

```text
Current Phase: product-discovery
Status: in-progress
Product Hypothesis Approval: pending
```

## Inception Bootstrap State

When `aidlc-intent-bootstrap-lite` starts after Product Hypothesis approval, update `state.md` with:

```text
Current Phase: inception
Current Step: intent-bootstrap
Status: in-progress
Product Hypothesis Approval: approved
```

## Progress

| Stage | Status | Review | Artifacts | Notes |
|---|---|---|---|---|
| Product Discovery | Not Started | Pending | `product-hypothesis.md`, `user-journey.md` |  |
| Workflow Composition | Not Started | Pending | `workflow.md`, `workflow-rationale.md` |  |
| Requirements Analysis | Not Started | Pending | `requirements.md` |  |
| User Stories | Not Started | Pending | `personas.md`, `stories.md` |  |
| Wireframes | Not Started | Pending | `wireframes/` |  |
| Application Design | Not Started | Pending | `application-design.md` |  |
| Units Generation | Not Started | Pending | `units-of-work.md` |  |
| Inception Exit | Not Started | Pending | review only |  |

## Stop Rule

Do not proceed to the next stage until the current stage review is `Approved`.
