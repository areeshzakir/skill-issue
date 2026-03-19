---
name: skill-creator
title: Skill Creator
category: meta
creator: impeccable
organization: Claude Plugins Official
description: Create, modify, and improve skills and measure performance
tags:
  - skills
  - creation
  - optimization
source: impeccable
---

Skill Creator is a meta-skill for building, iterating on, and measuring the effectiveness of other skills. It provides a structured workflow for defining a new skill's purpose, writing its system prompt, configuring its parameters, testing it against sample inputs, measuring output quality, and publishing it to the skill registry. It also supports modifying existing skills based on performance data and user feedback.

Use Skill Creator when you want to package a repeatable workflow into a reusable skill, when an existing skill needs refinement based on real-world usage patterns, or when you want to A/B test different versions of a skill's prompt to optimize output quality. It is the primary tool for skill authors and platform maintainers.

Example: Run Skill Creator to build a new "Release Notes" skill that generates user-facing changelog entries from git commit history. The workflow guides you through defining the skill's input schema (git range, audience type), writing the system prompt with tone guidelines, testing against 5 sample commit ranges, scoring the outputs for clarity and completeness, and publishing the skill with proper metadata and tags.
