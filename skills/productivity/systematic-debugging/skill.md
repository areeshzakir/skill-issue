---
name: systematic-debugging
title: Systematic Debugging
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Debug bugs and test failures using systematic methodology
tags:
  - debugging
  - troubleshooting
  - bugs
source: superpowers
---

Systematic Debugging applies a structured diagnostic methodology to identify and fix bugs and test failures. Rather than guessing or making random changes, it follows a disciplined process: reproduce the issue, gather evidence through logs and state inspection, form hypotheses ranked by likelihood, test each hypothesis with minimal changes, verify the fix, and confirm no regressions were introduced. It maintains a diagnostic log throughout the process.

Use Systematic Debugging when you encounter a bug that is not immediately obvious, when tests fail intermittently, when a fix in one area causes failures elsewhere, or when you have been staring at a problem too long and need a fresh, structured approach. It is especially valuable for race conditions, state management bugs, and issues that span multiple system layers.

Example: Report "user login succeeds but the dashboard shows a blank page." Systematic Debugging first reproduces the issue, then checks the network tab (API returns 200 with valid data), inspects the React component tree (state is populated but render output is empty), examines the render logic (finds a conditional check for `user.role` which is undefined for newly migrated users), and implements the fix with a fallback default role. It then adds a regression test for the migrated user scenario.
