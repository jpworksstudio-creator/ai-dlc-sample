---
name: aidlc-wireframes-lite
description: Creates low-fidelity HTML wireframes and screen specifications for UI-focused small Greenfield MVPs. Use after user stories approval to define screens, flows, states, responsive behavior, accessibility, and story traceability.
---

# AI-DLC Wireframes Lite

## Purpose

Validate the MVP's UI structure, user flow, screen states, and data needs before application design.

## When to Use

Use after `inception/personas.md` and `inception/stories.md` are approved. This Skill is important for UI/UX-focused MVPs.

## Inputs

- `inception/requirements.md`
- `inception/personas.md`
- `inception/stories.md`
- `product-discovery/user-journey.md`
- Existing design system notes, if any

## Process

1. Identify major screens and each screen's purpose.
2. Map screens to UI-facing stories.
3. Define navigation, screen transitions, and user flows.
4. Specify displayed data, submitted data, and user actions.
5. Cover Loading, Empty, Error, Success, Validation Error, and Permission Denied states.
6. Define responsive behavior, including Mobile width.
7. Capture accessibility, navigation, information density, and design system availability.
8. Create low-fidelity HTML wireframes under `screens/`.
9. Update `traceability.md` from User Story to Screen.
10. Ask for human approval.

## Outputs

All paths are relative to the intent directory `docs/aidlc/intents/intent-<nnn>-<slug>/`.

```text
inception/wireframes/
├─ screen-data-map.md
├─ screen-structure.md
├─ wireframe-guidance.md
└─ screens/
   └─ <screen-name>.html
```

Create each output from its template in `docs/aidlc/templates/`:

- `screen-data-map.md`: `screen-data-map-template.md`
- `screen-structure.md`: `screen-structure-template.md`
- `wireframe-guidance.md`: `wireframe-guidance-template.md`
- `reviews/wireframes-review.md`: `review-template.md`

HTML is the standard format for simple wireframes because it supports input, interaction, state changes, responsive checks, and flow review. SVG is optional only when static layout review is enough.

## Human Approval Gate

Do not proceed to Application Design until wireframes are approved.

Record review result under:

```text
reviews/wireframes-review.md
```

## Stop Conditions

- Wireframes are not approved.
- A UI-facing story has no screen.
- A screen introduces functionality not present in requirements or stories.
- HTML wireframes do not show inputs, buttons, transitions, states, or Mobile width behavior.

## Do Not Do

- Do not create high-fidelity visual design.
- Do not implement production UI.
- Do not add unapproved features.
- Do not decide backend architecture.
- Do not write application code.

## Validation Checklist

Use `docs/aidlc/checklists/wireframes-checklist.md`.

Before requesting human approval, self-review every checklist item and record each result in the review file's Agent Self-Review section as `Pass`, `Concern`, or `Fail` with a short note. Present only `Concern` and `Fail` items to the human, each with a question or a proposed fix. Self-review never replaces human approval.

## Next Skill

`aidlc-application-design-lite`
