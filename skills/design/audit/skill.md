---
name: audit
title: Audit
category: design
creator: impeccable
organization: Claude Plugins Official
description: Comprehensive interface quality audit across accessibility, performance, and responsive design
tags:
  - accessibility
  - a11y
  - audit
  - performance
source: impeccable
---

Audit performs a thorough quality review of your interface, evaluating it across multiple dimensions including accessibility compliance (WCAG 2.1), performance metrics, responsive behavior, color contrast ratios, keyboard navigation, screen reader compatibility, and semantic HTML structure. It produces a prioritized report of issues with severity ratings and actionable fix recommendations.

Use Audit before launching a new feature, during a design review cycle, or when you suspect your interface has accumulated quality debt. It catches problems that are easy to miss during development such as missing alt text, insufficient touch targets, focus trap issues, and color combinations that fail contrast requirements.

Example: Run Audit against your checkout flow to receive a detailed report identifying that your error messages lack ARIA live regions, two button pairs have insufficient color contrast at 3.2:1 ratio, and the mobile layout breaks at 320px viewport width. Each finding includes the specific fix and its priority level.
