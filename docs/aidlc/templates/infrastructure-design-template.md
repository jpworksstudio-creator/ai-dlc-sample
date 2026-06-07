# Infrastructure Design

## Unit

Unit ID:

## Environment Variables

| Name | Purpose | Required | Secret | Mockable | Notes |
|---|---|---|---|---|---|
| <NAME> | <purpose> | Yes / No | Yes / No | Yes / No | <notes> |

## External API Conditions

| API | Purpose | Timeout | Retry | Mock / Fixture |
|---|---|---|---|---|
| <api> | <purpose> | <timeout> | <policy> | <mock> |

## Local Runtime Needs

- <need>

## Provisioning Boundary

Do not deploy, run Terraform Apply, configure monitoring, or commit secrets in Construction.
