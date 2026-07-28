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

- Tailwind CSS v4, configured CSS-first in `src/styles.css` (no `tailwind.config.js`) — customise the theme with `@theme` there. Oxfmt auto-sorts classes via its `sortTailwindcss` option in `.oxfmtrc.json`.
- [shadcn/ui](https://ui.shadcn.com) is configured via `components.json`; add components with `bunx --bun shadcn add <component>` (installed into `src/components/ui`).
- UI primitives (e.g. `Button`) are built on `@base-ui/react`, not Radix. Swap the rendered element with a `render` prop (e.g. `<Dialog.Trigger render={<a href="..." />}>`), **not** `asChild`
- For links styled as buttons, apply `buttonVariants` to a plain `<a>` instead of wrapping it in `<Button render={<a/>} />`
