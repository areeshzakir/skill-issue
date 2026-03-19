---
name: teach-impeccable
title: Teach Impeccable
category: design
creator: impeccable
organization: Claude Plugins Official
description: One-time setup to gather design context for persistent guidelines
tags:
  - setup
  - config
  - design-system
source: impeccable
---

Teach Impeccable is a one-time configuration skill that gathers your project's design context and preferences to create persistent guidelines that all other Impeccable design skills will reference. It walks you through defining your design system tokens, brand voice, preferred component library, spacing scale, color palette, typography choices, and any project-specific constraints or conventions.

Use Teach Impeccable before using any other Impeccable design skill for the first time on a project. It ensures that every subsequent skill invocation (Bolder, Polish, Normalize, etc.) produces output that is consistent with your specific project's design language rather than generic best practices. You only need to run it once per project, though you can update the guidelines anytime.

Example: Run Teach Impeccable and it will ask about your tech stack (React + Tailwind), design system (custom tokens based on 8px grid), brand personality (professional but approachable), color palette (specific hex values), and any constraints (must support dark mode, RTL languages). This context is saved and automatically applied whenever you invoke other Impeccable skills on this project.
