# Traceability Matrix

Track the path from product hypothesis to implemented code.

```text
Hypothesis
  ↓
Success Metric
  ↓
Requirement
  ↓
User Story
  ↓
Screen
  ↓
Unit of Work
  ↓
Layer (implemented files and tests)
```

| ID | Type | Name | Maps To | Unconnected Reason | Approval Status |
|---|---|---|---|---|---|
| H-1 | Hypothesis | <hypothesis> | SM-1 |  | Pending |
| SM-1 | Success Metric | <metric> | FR-1 |  | Pending |
| FR-1 | Requirement | <requirement> | S-1 |  | Pending |
| S-1 | User Story | <story> | SCR-1 |  | Pending |
| SCR-1 | Screen | <screen> | U-1 |  | Pending |
| U-1 | Unit of Work | <unit> | L-1 |  | Pending |
| L-1 | Layer | <layer summary, key files, tests> |  |  | Pending |

Layer rows are added during Construction by `aidlc-code-generation-lite` after each approved Layer.

## Rules

- Every approved hypothesis should map to at least one success metric.
- Every approved requirement should map to at least one story.
- Every UI story should map to at least one screen.
- Every story should map to exactly one primary unit or state why not.
- Every completed unit should map to at least one approved Layer with key files and tests.
