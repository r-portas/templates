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

## User Interface

- This project uses Tailwind CSS (v4) for styling.
- Tailwind is configured CSS-first via `src/styles.css` (`@import "tailwindcss";`); there is no `tailwind.config.js`. Customise the theme with `@theme` in that file.
- Tailwind class sorting is handled by Oxfmt's `sortTailwindcss` option in `.oxfmtrc.json`, so classes are reordered automatically on format.
- This project is configured with [shadcn/ui](https://ui.shadcn.com). Configuration lives in `components.json`; components are added via `bunx --bun shadcn@latest add <component>` and installed into `src/components/ui`.

## Workflow

- After making changes:
  - Run the linter with `bun run lint`
  - Typecheck and build the project with `bun run build`
