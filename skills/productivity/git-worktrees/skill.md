---
name: git-worktrees
title: Git Worktrees
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Use git worktrees for isolated feature development
tags:
  - git
  - worktrees
  - isolation
source: superpowers
---

Git Worktrees manages isolated development environments using git's worktree feature, allowing you to work on multiple branches simultaneously without stashing changes or switching contexts. It handles worktree creation, branch setup, dependency installation, and cleanup, ensuring each feature gets a completely isolated working directory while sharing the same git history.

Use Git Worktrees when you need to context-switch between features without disrupting your current work, when running long builds or tests on one branch while developing on another, when reviewing a pull request while keeping your in-progress work intact, or when you want multiple agents working on different features simultaneously without file conflicts.

Example: You are mid-implementation on a feature branch when an urgent bug fix is needed. Run Git Worktrees to create a new worktree at `../project-hotfix` on a `hotfix/login-crash` branch, install dependencies, and open it ready for work. Your original feature branch remains untouched in its working directory. After the hotfix is merged, Git Worktrees cleans up the temporary worktree and its associated branch tracking.
