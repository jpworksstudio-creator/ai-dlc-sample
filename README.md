# AI-DLC Lite MVP Template

A lightweight template for small Greenfield MVP development, based on the design philosophy of AWS Labs AI-DLC v2.

Instead of porting the full AI-DLC v2 runtime, this template distills the core ideas into a form that Cursor Agent can handle easily:

- staged progression through Product Discovery, Inception, and Construction
- explicit human approval gates at every stage
- traceability from hypothesis to implemented code
- right-sized workflows (skip stages that are not needed)
- clear separation of facts, hypotheses, decisions, and open questions
- stopping before Operations unless humans explicitly decide otherwise

## Overall Flow

```text
/ux-product-discovery-lite
  └─ Create the Product Hypothesis ──▶ human approves
        ↓
/aidlc-inception-lite
  └─ Requirements → Stories → Wireframes → Design → Unit split
     (human approves each stage) ──▶ approve Inception Exit
        ↓
/aidlc-construction-lite
  └─ Plan → per-Unit design, implementation, and tests
     (human approves each Layer) ──▶ approve Construction Exit
        ↓
Stop here (do not proceed to Operations)
```

## Quick Start

1. Copy this template into a new repository.
2. Describe your product idea in Cursor chat and run `/ux-product-discovery-lite`.
3. Follow the Agent's guidance: review and approve the artifacts at each stage.

The Agent never proceeds to the next stage without approval. If an artifact has problems, reply with `Revision Required` and the Agent redoes that stage.

## Phase Guide

### 1. Product Discovery (`/ux-product-discovery-lite`)

Establish who the MVP serves, what problem it solves, and which hypothesis to bet on.

| Artifact | Content |
|---|---|
| `intent.md` | Original request and intent |
| `product-discovery/product-hypothesis.md` | Target user, problem, riskiest hypothesis, success metrics |
| `product-discovery/user-journey.md` | Primary user journey |

**Human approves:** the Product Hypothesis

### 2. Inception (`/aidlc-inception-lite`)

Turn the approved hypothesis into an implementable plan, in this order:

| # | Skill | Artifacts | Human approves |
|---|---|---|---|
| 1 | `aidlc-intent-bootstrap-lite` | `workflow.md` and management files | Promotion into Inception |
| 2 | `aidlc-workflow-composition-lite` | `workflow.md` `workflow-rationale.md` | Included and skipped stages |
| 3 | `aidlc-requirements-analysis-lite` | `inception/requirements.md` | FR / NFR |
| 4 | `aidlc-user-stories-lite` | `inception/personas.md` `inception/stories.md` | Personas and stories |
| 5 | `aidlc-wireframes-lite` | `inception/wireframes/` (HTML) | Screens, flows, and states |
| 6 | `aidlc-application-design-lite` | `inception/application-design.md` | Logical design |
| 7 | `aidlc-units-generation-lite` | `inception/units-of-work.md` | Unit split and Inception Exit |

**Human approves:** each stage's artifacts, then Inception Exit

### 3. Construction (`/aidlc-construction-lite`)

Build the actual code from approved Inception outputs.

```text
Construction Input Readiness check ──▶ approve
        ↓
Create Construction Plan ──▶ approve
        ↓
Per-Unit loop:
  Functional Design ──▶ approve
  NFR Assessment ──▶ approve
  (NFR Design / Infrastructure Design when needed ──▶ approve)
  Code Generation: implement in Layers of about 5-8 files
    Build / Test after each Layer ──▶ approve
  (UI Review for Units with UI ──▶ approve)
        ↓
Final Integration Validation ──▶ approve
        ↓
Construction Exit ──▶ approve and stop
```

**Human approves:** the plan, each design, each implemented Layer, final integration, and Construction Exit

## Artifact Layout

All artifacts for an intent live under one directory:

```text
docs/aidlc/intents/intent-<nnn>-<slug>/
├─ intent.md / state.md / workflow.md
├─ decisions.md / open-questions.md / traceability.md
├─ product-discovery/
├─ inception/
├─ construction/
│  ├─ construction-plan.md / state.md
│  ├─ shared/          (cross-Unit constraints and baselines)
│  ├─ <unit-id>/       (per-Unit designs, Layers, and reviews)
│  └─ reviews/         (Construction-wide reviews)
└─ reviews/            (Discovery / Inception reviews)
```

Application code and tests are written to the repository source tree as planned in the approved `code-generation-plan.md`.

## How Approval Works

- Each stage's approval result is recorded in a review file under `reviews/` (`Approved` / `Revision Required`).
- The Agent is forbidden from proceeding to the next stage without an `Approved` review.
- Manual review criteria are collected in the checklists under `docs/aidlc/checklists/`.

## Repository Structure

```text
.agents/skills/        Skill definitions (per-phase steps, stop conditions, prohibitions)
.cursor/rules/         Cursor entry rule
docs/aidlc/templates/  Artifact templates
docs/aidlc/checklists/ Checklists for human approval
docs/aidlc/intents/    Per-intent artifacts (generated at runtime)
docs/aidlc/            Harness design documents
```

## Design Principles (What Is Kept Lightweight)

This template keeps the AI-DLC v2 design philosophy while intentionally omitting the following in the initial setup:

- Kiro-specific `.kiro/` runtime files
- Subagents / Hooks / MCP / Process Checker
- automatic validation scripts
- Operations automation

See `docs/aidlc/UPSTREAM.md` and `docs/aidlc/CONSTRUCTION-HARNESS.md` for details.

## Operations Boundary

This template stops at Construction Exit. It does not perform:

- production deployment
- Terraform Apply
- monitoring or alert setup
- release automation
- secret generation or commit

Operations requires a separate, explicit human request.
