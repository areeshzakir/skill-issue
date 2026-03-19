---
name: test-driven-development
title: Test-Driven Development
category: productivity
creator: superpowers
organization: Claude Plugins Official
description: Implement features using test-driven development methodology
tags:
  - tdd
  - testing
  - development
source: superpowers
---

Test-Driven Development enforces the red-green-refactor cycle for feature implementation. It begins by writing failing tests that define the expected behavior, then implements the minimum code to make each test pass, and finally refactors for clarity and efficiency while maintaining a green test suite. This disciplined approach produces well-tested, modular code with clear specifications embedded in the test suite.

Use Test-Driven Development when building business-critical logic where correctness is paramount, when implementing algorithms or data transformations that have well-defined inputs and outputs, or when you want to ensure comprehensive test coverage from the start rather than bolting tests on afterward. It is particularly effective for API endpoints, utility functions, state management logic, and data validation rules.

Example: Request "implement a coupon code validation system" using Test-Driven Development. It first writes tests for valid codes, expired codes, usage limits, minimum order amounts, and stacking rules. Each test initially fails (red). Then it implements the validation logic function by function, making tests pass one at a time (green). Finally, it refactors common validation patterns into a pipeline architecture (refactor), with all tests still passing.
