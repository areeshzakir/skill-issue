---
name: normalize
title: Normalize
category: design
creator: impeccable
organization: Claude Plugins Official
description: Normalize design to match your design system
tags:
  - consistency
  - design-system
  - standards
source: impeccable
---

Normalize reviews your interface implementation and aligns it with your established design system specifications. It detects deviations from your defined spacing scale, typography tokens, color palette, component usage patterns, and layout conventions, then corrects them to ensure visual consistency across the product. It works with any design system framework including custom token sets.

Use Normalize after integrating third-party components, when onboarding new team members whose code may not yet follow conventions, or during periodic codebase hygiene sweeps. It is especially valuable when multiple developers have contributed to the same interface and subtle inconsistencies have crept in.

Example: A new feature page uses 14px body text while your design system specifies 16px, applies padding of 20px instead of your 24px spacing token, and uses a button with rounded corners that differs from your standard 8px border radius. Run Normalize to automatically correct all deviations and generate a diff showing exactly what changed and which token each value was mapped to.
