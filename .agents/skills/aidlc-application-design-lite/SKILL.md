---
name: aidlc-application-design-lite
description: Produces lightweight technology-agnostic application design for a small Greenfield MVP. Use after wireframes approval to define logical components, responsibilities, dependencies, services, data, APIs, and cross-cutting concerns.
---

# AI-DLC Application Design Lite

## Purpose

Design the logical application structure needed to support approved requirements, stories, and wireframes.

## When to Use

Use only after wireframes are approved.

## Inputs

- `inception/requirements.md`
- `inception/personas.md`
- `inception/stories.md`
- `inception/wireframes/screen-data-map.md`
- `inception/wireframes/screen-structure.md`
- `inception/wireframes/wireframe-guidance.md`
- `decisions.md`
- `open-questions.md`

## Process

1. Define logical components and responsibilities.
2. Identify dependencies and services.
3. Summarize cross-cutting concerns.
4. Define lightweight data model and API overview.
5. Capture external dependencies.
6. Ensure wireframe data needs can be served by the design.
7. Cover authentication, input validation, logging, and error handling.
8. Update `traceability.md` where design supports stories and screens.
9. Ask for human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
inception/application-design.md
```

Create each output from its template in `docs/aidlc/templates/`:

- `application-design.md`: `application-design-template.md`
- `reviews/application-design-review.md`: `review-template.md`

## Human Approval Gate

Do not proceed to Units Generation until application design is approved.

Record review result under:

```text
reviews/application-design-review.md
```

## Stop Conditions

- Application Design is not approved.
- Wireframe data needs are not covered.
- A story cannot be supported by any component, service, API, or data model.
- A technology choice is introduced without human approval.

## Do Not Do

- Do not choose a specific framework, cloud service, library, database, or protocol too early.
- Do not write implementation code.
- Do not create infrastructure.
- Do not start Construction.

## Validation Checklist

Use `docs/aidlc/checklists/application-design-checklist.md`.

## Next Skill

`aidlc-units-generation-lite`
