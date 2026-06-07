# Workflow Rationale

## Included Skills

| Skill | Reason | Approval Required |
|---|---|---|
| `ux-product-discovery-lite` | Clarify who, problem, hypothesis, and MVP metrics before AI-DLC Inception | Yes |
| `aidlc-inception-lite` | Coordinate Inception and enforce approval gates | Yes |
| `aidlc-intent-bootstrap-lite` | Initialize intent artifacts and traceability | Yes |
| `aidlc-workflow-composition-lite` | Preserve AI-DLC v2 right-sizing in lightweight form | Yes |
| `aidlc-requirements-analysis-lite` | Produce verifiable FR/NFR and scope | Yes |
| `aidlc-user-stories-lite` | Convert approved requirements into traceable stories | Yes |
| `aidlc-wireframes-lite` | Validate UI flow and screen states before design | Yes |
| `aidlc-application-design-lite` | Produce lightweight logical design | Yes |
| `aidlc-units-generation-lite` | Decide single vs multiple units; required for first learning run | Yes |

## Skipped Skills

| Skill / Capability | Reason |
|---|---|
| Reverse Engineering | Initial target is small Greenfield MVP |
| Construction Skills | This Harness stops before Construction |
| Operations Skills | Out of scope for initial Harness |
| Vercel Labs Skills | Reserved for Construction and UI implementation review |

## Conditional Skills

| Skill | Run When |
|---|---|
| `aidlc-units-generation-lite` | Multiple units may be needed, or during first learning run |
