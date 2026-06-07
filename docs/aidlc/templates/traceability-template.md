# Traceability Matrix

Track the path from product hypothesis to implementation unit.

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
```

| ID | Type | Name | Maps To | Unconnected Reason | Approval Status |
|---|---|---|---|---|---|
| H-1 | Hypothesis | <hypothesis> | SM-1 |  | Pending |
| SM-1 | Success Metric | <metric> | FR-1 |  | Pending |
| FR-1 | Requirement | <requirement> | S-1 |  | Pending |
| S-1 | User Story | <story> | SCR-1 |  | Pending |
| SCR-1 | Screen | <screen> | U-1 |  | Pending |
| U-1 | Unit of Work | <unit> |  |  | Pending |

## Rules

- Every approved hypothesis should map to at least one success metric.
- Every approved requirement should map to at least one story.
- Every UI story should map to at least one screen.
- Every story should map to exactly one primary unit or state why not.
