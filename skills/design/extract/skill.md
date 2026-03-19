---
name: extract
title: Extract
category: design
creator: impeccable
organization: Claude Plugins Official
description: Extract reusable components and design tokens into your design system
tags:
  - design-system
  - tokens
  - components
source: impeccable
---

Extract scans your existing interface code and identifies patterns that should be abstracted into reusable design system components and tokens. It detects repeated color values, spacing patterns, typography scales, border radii, shadow definitions, and component structures, then generates properly documented, composable components and a token file that ensures consistency across your product.

Use Extract when your codebase has grown organically and accumulated inconsistent styling, when you are establishing a design system from an existing product, or when you notice the same UI pattern implemented slightly differently across multiple pages. It accelerates the transition from ad-hoc styling to a systematic design language.

Example: Your application uses 14 slightly different shades of blue and 3 variations of card components. Run Extract to consolidate these into a token set of 5 intentional blue values (primary, hover, active, light, dark) and a single Card component with variant props for elevation, padding, and border styles. It outputs the token file, component code, and a migration guide for updating existing usage.
