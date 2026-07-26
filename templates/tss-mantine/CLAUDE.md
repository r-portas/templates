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

- `src/components` contains shared React components not tied to a single route:
  - A single component shared across multiple routes (e.g. a layout) lives directly in `components` (e.g. `components/app-layout.tsx`).
  - A group of related components for a specific feature/domain is grouped into a subfolder named after that domain (e.g. `components/templates`).
  - UI primitives (e.g. from shadcn/ui) live in `components/ui`.
  - A component used by only one route should stay colocated in that route file rather than being pulled into `src/components` prematurely.
- `src/hooks` contains reusable React hooks shared across multiple components/routes, one hook per file (e.g. `use-media-query.ts` exporting `useMediaQuery`). A hook used by only one component should stay colocated with that component rather than being pulled into `src/hooks` prematurely.
- `src/lib` contains the project's library code, grouped by domain via this naming convention (e.g. for a `todos` domain):
  - `todos.server.ts` — server-only code, usually paired with `todos.server.test.ts` to unit test it.
  - `todos.functions.ts` — a thin wrapper exposing server functions, importing from `todos.server.ts`.
  - `todos.schemas.ts` — Zod schemas for the domain.
  - `todos.ts` — isomorphic code that can run on either the client or server (e.g. date helpers), usually paired with `todos.test.ts` to unit test it.

## User Interface

- This project uses Mantine for UI components, see https://mantine.dev/llms.txt for documentation.

## Workflow

- After making changes:
  - Run the linter with `bun run lint`
  - Build and typecheck the project with `bun run build`
