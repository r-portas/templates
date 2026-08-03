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

- Tailwind CSS v4, configured CSS-first in `src/styles.css` (no `tailwind.config.js`) — customise the theme with `@theme` there. Oxfmt auto-sorts classes via its `sortTailwindcss` option in `.oxfmtrc.json`.
- [shadcn/ui](https://ui.shadcn.com) is configured via `components.json`; add components with `bunx --bun shadcn add <component>` (installed into `src/components/ui`).
- UI primitives (e.g. `Button`) are built on `@base-ui/react`, not Radix. Swap the rendered element with a `render` prop (e.g. `<Dialog.Trigger render={<a href="..." />}>`), **not** `asChild`
- For links styled as buttons, apply `buttonVariants` to a plain `<a>` instead of wrapping it in `<Button render={<a/>} />`

## Testing

- Tests run via Bun's built-in test runner (`bun test`, importing from `bun:test`) — this is the
  only template/package with tests set up; don't add Jest or Vitest.
- Colocate tests with the module they cover, following the `src/lib` domain naming convention:
  `<domain>.test.ts` for isomorphic code, `<domain>.server.test.ts` for server-only code.
- Run `bun test` (or `bun run lint && bun run build`, which the CI workflow also runs) before
  considering a change to `./docs` done.
