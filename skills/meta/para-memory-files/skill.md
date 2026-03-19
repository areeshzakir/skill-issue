---
name: para-memory-files
title: PARA Memory Files
category: meta
creator: paperclip
organization: Paperclip
description: Persistent file-based memory system using PARA method
tags:
  - memory
  - para
  - knowledge-management
source: paperclip
---

PARA Memory Files implements a persistent, file-based memory system organized using Tiago Forte's PARA method (Projects, Areas, Resources, Archives). It gives agents and workflows durable memory that persists across sessions by storing structured knowledge in markdown files organized into the four PARA categories. This enables agents to accumulate context over time rather than starting fresh each session.

Use PARA Memory Files when you need agents to retain information across sessions, when building workflows that accumulate knowledge over time (like ongoing research or iterative design), or when you want a human-readable knowledge base that both agents and people can browse. It is the foundation for any long-running project where context loss between sessions would be costly.

Example: After a research session, PARA Memory Files saves key findings to Resources/market-research.md, updates the active project brief in Projects/q2-launch.md with new competitive insights, logs a recurring process to Areas/weekly-reporting.md, and moves the completed competitor analysis to Archives/2026-q1-competitor-analysis.md. Next session, the agent picks up exactly where it left off with full context.
