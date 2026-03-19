---
name: parallel-agents
title: Parallel Agents
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Dispatch parallel agents for independent tasks
tags:
  - parallelism
  - agents
  - efficiency
source: superpowers
---

Parallel Agents enables you to dispatch multiple independent tasks to run concurrently, dramatically reducing total completion time for workloads that do not have sequential dependencies. It handles task decomposition, agent spawning, progress monitoring, result aggregation, and conflict resolution when parallel outputs need to be merged back into a single codebase or document.

Use Parallel Agents when you have multiple independent tasks that would normally be done sequentially, such as writing tests for different modules, implementing unrelated features, auditing multiple systems, or researching several topics. It is the key to unlocking throughput gains for any workload where tasks do not depend on each other's outputs.

Example: You need to add input validation to 5 independent API endpoints. Run Parallel Agents to dispatch 5 concurrent agents, each implementing validation for one endpoint with its own tests. Each agent works in an isolated git worktree to avoid file conflicts. Once all agents complete, Parallel Agents presents a summary of the 5 changes for your review and merges them into a single branch, resolving any minor conflicts in shared files like the validation utility module.
