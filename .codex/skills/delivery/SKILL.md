---
name: delivery
description: Deliver features, fixes, and refactors in this repository while following the local stack, testing strategy, and repository conventions.
---

# Delivery

Use the repository’s existing stack and conventions unless the user explicitly asks to replace them.

Follow this workflow:

1. State the behavior being changed.
2. Add or update a failing test first.
3. Implement the minimum change to make the test pass.
4. Run the repository’s main validation path.
5. If the change affects frontend behavior, update or add E2E coverage.

Rules:

- Reuse before creation.
- Extend shared abstractions safely.
- Do not broaden scope without explicit instruction.
- Use current official or primary documentation for non-trivial work.
- Document key files, changed behavior, and validation when reporting completion.

