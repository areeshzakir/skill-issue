---
name: code-review
title: Code Review
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Request and receive thorough code reviews
tags:
  - code-review
  - quality
  - feedback
source: superpowers
---

Code Review performs a thorough, multi-dimensional review of your code changes. It evaluates correctness, readability, performance, security, test coverage, error handling, naming conventions, and architectural alignment. Feedback is categorized by severity (blocker, suggestion, nit) and each comment includes a specific rationale and, where applicable, a suggested alternative implementation.

Use Code Review before merging pull requests, after completing a feature implementation, when working without a team to provide peer review, or when you want a second opinion on a tricky piece of logic. It catches issues that linters miss, such as logical errors, race conditions, missing edge cases, and architectural concerns that require human-level understanding.

Example: Submit your authentication middleware changes for Code Review to receive feedback such as: [Blocker] the token expiration check uses local time instead of UTC which will fail for users in negative UTC offsets, [Suggestion] the retry logic should use exponential backoff instead of fixed 1-second delays, [Nit] the variable name `d` should be `decodedPayload` for clarity. Each item includes the file, line number, and a corrected code snippet.
