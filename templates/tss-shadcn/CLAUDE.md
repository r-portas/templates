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

## User Interface

- This project uses Tailwind CSS (v4) for styling.
- Tailwind is configured CSS-first via `src/styles.css` (`@import "tailwindcss";`); there is no `tailwind.config.js`. Customise the theme with `@theme` in that file.
- Tailwind class sorting is handled by Oxfmt's `sortTailwindcss` option in `.oxfmtrc.json`, so classes are reordered automatically on format.
- This project is configured with [shadcn/ui](https://ui.shadcn.com). Configuration lives in `components.json`; components are added via `bunx --bun shadcn@latest add <component>` and installed into `src/components/ui`.
- UI primitives (e.g. `Button`) are built on `@base-ui/react`, not Radix. Base UI uses a `render` prop to swap the rendered element (e.g. `<Button render={<a href="..." />}>`), **not** `asChild`. Using `asChild` silently does nothing and produces invalid nested markup (e.g. `<button><a>...</a></button>`).

## Workflow

- After making changes:
  - Run the linter with `bun run lint`
  - Build and typecheck the project with `bun run build`
