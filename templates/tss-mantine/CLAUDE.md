# CLAUDE.md

<!-- intent-skills:start -->

## Skill Loading

Before editing files for a substantial task:

- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Project Structure

- `src/lib` contains the project's library code, grouped by domain via this naming convention (e.g. for a `todos` domain):
  - `todos.server.ts` — server-only code, usually paired with `todos.server.test.ts` to unit test it.
  - `todos.functions.ts` — a thin wrapper exposing server functions, importing from `todos.server.ts`.
  - `todos.schemas.ts` — Zod schemas for the domain.
  - `todos.ts` — isomorphic code that can run on either the client or server (e.g. date helpers), usually paired with `todos.test.ts` to unit test it.
- Environment variables are validated with Zod, and must be added to the relevant schema before use:
  - `src/lib/env.ts` — client-readable variables, which must be prefixed with `VITE_`. Values come from `.env` (committed) and `.env.local` (gitignored, for secrets).
  - `src/lib/env.server.ts` — server-only variables.

## User Interface

- This project uses Mantine for UI components, see https://mantine.dev/llms.txt for documentation.
- Icons come from `@phosphor-icons/react`, imported with the `Icon` suffix (e.g. `HouseIcon`).
- `src/components/app-layout.tsx` holds the `AppShell` wrapper and `src/components/navbar.tsx` the header bar; add new navigation links to `NAV_ITEMS` there.
- The default not found and error components are defined in `src/router.tsx` using Mantine's `EmptyState`.
