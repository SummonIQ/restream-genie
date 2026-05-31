# AI Project Canon

This document is the canonical operating contract for AI-driven software projects. Use it to start a new project, join an existing one, or evolve a repository without re-inventing agent rules each time.

It is intended to be adapted into repository-level files such as `AGENTS.md`, local skills, CI workflows, validation scripts, and project documentation. When a repository-level rule conflicts with this document, the repository may narrow the rule for its local context, but it should not weaken the core engineering standards without explicit intent.

## Purpose

Use this canon to ensure that AI agents:

- behave predictably
- avoid unauthorized scope expansion
- validate changes before claiming success
- follow project conventions rather than inventing new ones
- preserve maintainability, accessibility, performance, security, and fault tolerance
- leave behind enough traceability that a human can understand, validate, or revert changes quickly

## Core Principles

### 1. Determinism over optimism

Agents must not claim something is fixed, complete, or working until they have validated it through the best available deterministic method.

Examples:

- If UI behavior changed, run the relevant end-to-end or interaction tests.
- If core logic changed, run unit tests.
- If build or type behavior changed, run compile checks and the production build if appropriate.
- If a platform integration changed, run the platform-specific validation path.

### 2. No unauthorized scope expansion

Agents must not take liberties.

Unless the user explicitly asks for broader intervention, agents must not:

- redesign unrelated areas
- refactor unrelated files
- fix unrelated bugs they happen to notice
- replace libraries or patterns outside the requested scope
- introduce architectural changes not required by the task

Acceptable exceptions:

- fix a directly blocking issue required to complete the requested task
- fix a regression introduced by the agent’s own change
- make narrowly-scoped support changes needed for validation, testing, or compatibility

### 3. TDD is the default

Agents should use red-green-refactor whenever behavior changes.

Minimum requirement:

1. State the behavior being changed.
2. Add or update a failing test.
3. Implement the minimum change to pass.
4. Refactor only after green.
5. Run the relevant validation suite.

### 4. Project conventions outrank personal preference

Agents must follow the conventions already established in a project for:

- frontend architecture
- backend architecture
- styling
- component composition
- test organization
- naming
- file layout
- release flow
- error handling
- observability

If no clear convention exists, agents may establish one, but they should do so explicitly and minimally.

### 4a. Reuse before creation

Agents must check whether an equivalent or near-equivalent component, type, helper, hook, service, or utility already exists before creating a new one.

Preferred order:

1. reuse an existing implementation as-is
2. extend an existing implementation without breaking current consumers
3. extract a shared abstraction if duplication is otherwise unavoidable
4. create a new implementation only when the above options are not appropriate

When extending existing code, agents must:

- preserve current behavior unless the task explicitly changes it
- avoid breaking existing call sites or visual implementations
- keep extension points clear and intentional
- prefer additive APIs over disruptive rewrites

### 5. Every change must remain understandable

Agents should produce changes that are easy for a human to inspect, validate, and revert.

That means:

- small, coherent changes
- clear file placement
- predictable patterns
- explicit validation
- concise change reporting

## Required Agent Behavior

### Validation and truthfulness

Agents must:

- validate before declaring success
- distinguish between implemented, validated, inferred, and unverified
- state clearly when something could not be verified
- prefer deterministic evidence over guesswork

Agents must not:

- say “fixed” immediately after editing code
- imply completion before tests, checks, or validation have run
- blur the difference between “I changed it” and “it is now verified”

### Scope discipline

Agents must:

- stay within requested scope
- call out adjacent issues without changing them unless instructed
- ask or wait when a broader change would be risky

Agents must not:

- opportunistically “clean up” unrelated code
- silently improve unrelated architecture
- fold in speculative fixes outside the user’s ask

### Documentation of changed logic and files

When reporting completed work, agents should document enough about the changed files and logic that the user can quickly understand what changed and request reversion if needed.

This does not require a file-by-file changelog for every task. It does require:

- naming the important files touched
- describing the behavioral change
- describing the validation performed
- mentioning any caveats or residual risks

For larger changes, agents should also mention:

- what new files were added
- what tests were added or updated
- what default patterns or conventions were codified
- whether existing abstractions were reused, extended, or newly introduced

### Engineering qualities to consider on every task

Agents must always consider:

- security
- fault tolerance
- performance
- accessibility
- maintainability
- operability
- correctness

This does not mean turning every task into a full audit. It means agents should avoid introducing avoidable regressions in these areas and should use them as decision criteria.

## Canonical Output Requirements

When finishing work, agents should include:

- what changed
- where it changed
- what was validated
- anything not validated
- any important caveat or rollback concern

If the task changed user-facing behavior, the completion note should also make it easy for a human to request reversion, for example by clearly identifying the affected files or behavior.

## Repository Files This Canon Recommends

Every serious AI-driven repository should have a subset of the following:

### Required

- `AGENTS.md`
- a canonical engineering rules document such as `AI_PROJECT_CANON.md`
- scripts for local validation
- CI that runs the primary validation path

### Strongly recommended

- repo-local skills for recurring agent workflows
- end-to-end tests
- unit tests for complex logic
- a documented dev entrypoint such as `start-dev`
- a single “verify” command that runs the default validation suite

### Suggested file roles

#### `AI_PROJECT_CANON.md`

Cross-project source of truth. Broad, reusable, stack-aware, and meant to be copied or adapted into future repos.

#### `AGENTS.md`

Repository-specific operational contract. Shorter than the canon. Should say what stack, commands, testing paths, and conventions apply in this repo right now.

#### `.codex/skills/...`

Workflow-specific instructions for common tasks such as frontend delivery, TDD enforcement, migrations, release prep, or data work.

#### `README.md`

Human-facing project setup and command reference.

#### CI workflow files

Executable enforcement of the repo’s validation rules.

## Canonical Validation Model

Validation should be layered.

### Layer 1: Compile and static validation

Examples:

- type checking
- linting
- formatting checks
- build validation
- schema generation

### Layer 2: Unit and integration tests

Use for:

- calculations
- parsing
- state transitions
- reducers
- transformations
- business rules
- service behavior
- native-side logic

### Layer 3: End-to-end or interaction validation

Use for:

- screens
- flows
- critical forms
- navigation
- interaction-heavy UI
- role- or permission-driven behavior

### Layer 4: Platform or deployment validation

Use for:

- desktop packaging
- server startup
- migrations
- platform bindings
- release artifacts

## Testing Rules

### Default expectations

- Frontend behavior should be validated with Playwright by default.
- Complex logic should have unit tests.
- If a test provides lasting regression value, create or keep a dedicated test file.
- Tests should live where humans will expect to find them.

### Playwright organization

Store Playwright tests under `e2e/`, organized by surface:

```text
e2e/
  pages/
    home/
      workbench.spec.ts
    settings/
      profile.spec.ts
      notifications.spec.ts
  app/
    onboarding/
      first-run.spec.ts
```

Rule:

- top level by page, route, screen, or app surface
- below that by feature on that surface

### Unit test organization

Prefer tests near the logic they protect unless the project already uses a centralized pattern.

Examples:

- `src/lib/core/workbench.test.ts`
- `backend/services/auth_service_test.py`
- `src-tauri/src/status_summary.rs` with module tests

## Frontend Canon

This section describes the default frontend standards when a repository uses a component-driven web UI.

### Default frontend stack

For React/Vite-style projects, default to:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-style primitives
- `motion/react` for animation
- Playwright for E2E
- fast unit tests such as Vitest

### Styling and component rules

- Prefer shared primitives under `src/components/ui`.
- Check whether a component already exists before creating another one.
- Prefer extending an existing component or variant API over creating a parallel component with overlapping behavior.
- Prefer utility-first styling with Tailwind and theme tokens.
- Prefer `class-variance-authority` for reusable variants.
- Prefer `cn()` or equivalent class merging utility.
- Prefer Radix-based primitives for accessibility-sensitive components.
- Avoid introducing a second component library unless explicitly requested.
- Avoid ad hoc one-off CSS systems when Tailwind and tokens are already in place.

### TypeScript rules

- Use strict TypeScript.
- Use the `@/` import alias by default.
- Put shared or cross-surface types in `src/types`.
- Import shared types via `@/types/...`.
- Check for an existing shared type before creating a new one.
- Keep component props types in the component file.
- Export component props types only when needed for extension or reuse.
- Keep trivial local types local.

### Animation rules

- Use `motion/react`.
- Keep animation purposeful.
- Acceptable uses: entrance, emphasis, state transitions, and list changes.
- Avoid decorative motion that adds noise or reduces clarity.

### Accessibility rules

- Preserve semantics
- preserve keyboard access
- preserve focus visibility
- use accessible labels and names
- avoid motion that harms accessibility
- prefer proven accessible primitives over custom interaction code

## Backend Canon

This section is intentionally technology-neutral.

Agents should adapt the language and framework, but the rules are stable.

### Backend rules

- Follow the project’s existing service boundaries.
- Keep business logic testable and separate from transport layers.
- Check for an existing service, helper, validator, or shared module before introducing a new one with overlapping responsibilities.
- Validate inputs at boundaries.
- Prefer explicit error handling.
- Consider retry behavior, timeouts, idempotency, and fallback behavior.
- Avoid leaking secrets or sensitive internals.
- Preserve observability where it exists.

### Python projects

Prefer:

- typed functions where the codebase uses typing
- small modules
- pytest for tests
- explicit dependency boundaries
- clear service and schema layers

### JavaScript or TypeScript services

Prefer:

- strict TypeScript when available
- well-scoped modules
- schema validation at boundaries
- minimal framework-specific magic
- tests around transformations, handlers, and services

## Framework Adapters

### Vite projects

Prefer:

- Vite dev server as the primary local preview path
- Playwright against the running local app
- explicit `build`, `check`, and `verify` commands

### Next.js projects

Prefer:

- Next.js official patterns
- documentation-first decisions
- Playwright for frontend flows
- route- or feature-based E2E organization
- careful server/client boundary handling
- framework-native caching, data-fetching, and rendering patterns

### Desktop Tauri projects

Prefer:

- small native modules
- UI logic in testable TypeScript where possible
- desktop smoke coverage for startup-critical paths
- end-to-end browser-style validation for frontend surfaces

## Research and Documentation Expectations

Agents should look up documentation or primary-source references when:

- using a new framework API
- touching security-sensitive code
- making performance-sensitive changes
- implementing accessibility-sensitive UI
- using unfamiliar platform integrations
- following fast-moving ecosystem patterns

Preferred source order:

1. official documentation
2. primary maintainer references
3. project-local patterns
4. high-quality secondary sources

Agents should not rely on vague memory when a quick check would materially reduce risk.

## Change Reporting Standard

A good completion report should let a human answer:

- What changed?
- Where did it change?
- How was it validated?
- What still might be risky?
- If something is wrong, what should be reverted or revisited?

### Minimum completion template

```text
Changed:
- <high-signal behavioral summary>

Key files:
- <path>
- <path>

Validated:
- <command or validation path>

Not validated:
- <if applicable>

Rollback-sensitive areas:
- <if applicable>
```

## Suggested Repository Template

When starting a new AI-driven project, create or adapt:

```text
AI_PROJECT_CANON.md
AGENTS.md
README.md
.codex/
  skills/
scripts/
e2e/
src/
  types/
.github/
  workflows/
```

## Portable Starter Pack

This repository includes a reusable implementation kit under `starter-pack/`.

Use it to bootstrap or standardize:

- `AGENTS.md`
- repo-local skills
- validation scripts
- CI workflows
- stack-specific overlays

Suggested workflow:

1. copy `AI_PROJECT_CANON.md`
2. copy `starter-pack/AGENTS.template.md` to `AGENTS.md`
3. adapt the relevant `starter-pack/skills/` templates into `.codex/skills/`
4. copy the relevant CI template from `starter-pack/ci/`
5. apply the relevant stack adapter from `starter-pack/stack-adapters/`
6. update commands, paths, and validation steps to match the actual repo

## Suggested `AGENTS.md` Compression Strategy

Do not paste this entire canon into every repository-level `AGENTS.md`.

Instead:

- keep `AGENTS.md` short and project-specific
- reference this canon explicitly
- include stack, commands, testing paths, and local conventions
- keep reusable cross-project rules here in the canon

## Canon Maintenance Rules

When this document evolves:

- update the canon first
- then update `AGENTS.md`
- then update repo-local skills
- then update scripts and CI
- then update README setup and validation sections

This keeps the canon as the source and the repository files as implementations.

## Shareable Short Form

Use this shorter version when you need a concise public-facing statement of how AI agents should work:

1. Agents must not claim work is done until they validate it.
2. Agents must use TDD for behavior changes.
3. Agents must follow project conventions rather than inventing parallel patterns.
4. Agents must validate frontend work with Playwright and complex logic with unit tests.
5. Agents must document changed files and logic clearly enough that regressions can be identified and changes can be reverted quickly.
6. Agents must not fix unrelated issues or broaden scope unless explicitly told to.
7. Agents must consider security, fault tolerance, performance, accessibility, and maintainability on every task.
8. Agents should research official or primary documentation when working in non-trivial or fast-moving areas.
