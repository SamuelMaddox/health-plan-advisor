---
applyTo: "**/*.{test,spec}.{ts,tsx},**/test/**,**/tests/**"
description: "Testing strategy: user-centric tests, avoid implementation details, keep tests flat and readable"
---

# Testing Instructions

- Write tests around user-observable behavior, not implementation details.
- Prefer Testing Library semantic queries in this order when possible:
  - `getByRole` / `findByRole`
  - `getByLabelText`
  - `getByText`
- Use `queryBy*` for non-existence assertions.
- Avoid over-nesting test suites. Prefer shallow structure and descriptive test names.
- Keep one behavior concern per test.
- Avoid snapshot-heavy tests for interactive UI; assert meaningful behavior instead.
- Only use `data-testid` when semantic queries are not feasible.
- Test loading, empty, success, and error states for behavior-critical UI.
- For route-dependent UI, test through routing behavior rather than mocking everything at unit level.
