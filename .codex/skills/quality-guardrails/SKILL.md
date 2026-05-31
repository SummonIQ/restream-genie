---
name: quality-guardrails
description: Enforce TDD, validation discipline, and change reporting standards for this repository.
---

# Quality Guardrails

Treat validation as mandatory.

Required sequence:

1. Define the behavior change.
2. Create or update a failing test.
3. Implement the smallest passing change.
4. Refactor after green.
5. Run the main validation path.
6. Add or update durable regression coverage when the behavior is valuable long-term.

Rules:

- Do not say something is fixed until it has been deterministically validated.
- Do not rely on stale documentation.
- Do not change unrelated code unless explicitly instructed.
- If an existing abstraction is extended, add or update coverage so current consumers are not broken.

