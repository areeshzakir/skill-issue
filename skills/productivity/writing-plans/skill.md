---
name: writing-plans
title: Writing Plans
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Create detailed implementation plans from specs or requirements
tags:
  - planning
  - implementation
  - specs
source: superpowers
---

Writing Plans transforms specifications, requirements documents, or feature descriptions into detailed, step-by-step implementation plans. Each plan includes a task breakdown with clear dependencies, estimated complexity, file-level change descriptions, testing requirements, and risk callouts. Plans are structured to be directly executable by a developer or by the Executing Plans skill.

Use Writing Plans after the design phase is complete and before implementation begins. It is the bridge between "what to build" and "how to build it," ensuring that nothing is missed during implementation. It is particularly valuable for complex features that touch multiple systems, require database migrations, or involve coordinated changes across frontend and backend.

Example: Provide Writing Plans with a spec for "add team billing to our SaaS platform." It generates a 15-step implementation plan: (1) add team_billing table migration, (2) create BillingService with Stripe integration, (3) build team plan selection UI, (4) implement seat-based proration logic, through to (15) add billing admin audit log. Each step includes the specific files to modify, the expected test coverage, and dependencies on prior steps.
