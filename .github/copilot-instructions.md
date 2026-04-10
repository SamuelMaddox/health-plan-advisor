# Health Plan Advisor Repository Instructions

## Stack and Scope

- This project is a Vite + React + TypeScript web app.
- Routing uses React Router in SPA/browser-router mode.
- UI uses Tailwind CSS v4 and shadcn-generated components.
- Keep changes task-focused. Avoid unrelated refactors.

## Source of Truth

- Use scripts from `package.json` as canonical commands.
- Use conventions documented in `README.md` when they exist.
- If a needed script is missing, propose adding it rather than repeatedly using ad-hoc shell commands.

## Standard Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run prettier`
- Format check: `npm run prettier:check`

## Testing Strategy

- Prefer behavior-focused tests over implementation-detail tests.
- Follow the Testing Library principle: the more tests resemble user behavior, the more confidence they provide.
- Prefer accessible queries (`getByRole`, `getByLabelText`, `getByText`) before `data-testid`.
- Use `data-testid` only when semantic queries are not practical.
- Keep tests flat and readable. Avoid deep nested `describe` blocks unless there is a clear need.
- Use clear Arrange / Act / Assert flow inside each test.
- Do not assert private internals like local state variables, internal function calls, or class names unless they are user-visible behavior.

## UI and Theme Rules

- Use semantic theme utilities in app code (`bg-background`, `text-foreground`, `border-border`, etc.).
- Do not use raw design-system variables (`--ds-*`) directly in component code.
- Keep raw tokens and theme mapping concerns in stylesheet files, not component logic.
- Prefer existing shadcn components and variants before building custom primitives.

## Safety and Review Priorities

- Prioritize bugs, behavior regressions, accessibility issues, and missing tests.
- Do not revert unrelated local changes.
- Keep public APIs stable unless the task explicitly requires a change.
