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

## Code Style

- Exports benefit from a short tsdoc comment describing intent and any non-obvious behaviour. Not required for every export — use judgment based on complexity. When you do add one, use the following format:
  ```ts
  /**
   * <short description>
   *
   * @param myParam - <short description>
   * ...
   *
   * @remarks
   * <optional: mention any behaviour that might trip up another developer>
   *
   * @example
   * \`\`\`ts
   * <example usage>
   * \`\`\`
   */
  ```
- Inline Comments
  - Add inline comments for any non-obvious behavior
  - Inline comments should explain the _why_
  - Inline comments should be concise and useful (1-2 lines max)

## Testing

- Always use Bun's test runner (`bun test`), see [the documentation](https://bun.com/docs/test.md) for more information.
- Before writing tests, extract pure functions and presentational components out of framework wrappers (e.g. `createServerFn`, route files) so tests don't need runtime context.

## Planning

- Before planning, check documentation using TanStack Intent
- Always prefer simpler, robust solutions
  - If you see a way to solve a problem simpler or most robustly, flag it with the user

## User Interface

- This project uses Mantine for UI components, see https://mantine.dev/llms.txt for documentation.
  It follows the `tss-mantine` template, so keep shared conventions aligned with it.
- Icons come from `@phosphor-icons/react`, imported with the `Icon` suffix (e.g. `PackageIcon`).
- `src/lib/theme.ts` — the Mantine theme, applied by the `MantineProvider` in `src/routes/__root.tsx`.
  The site is dark-only, forced via `forceColorScheme="dark"` on both the provider and
  `ColorSchemeScript`.
- `src/styles.css` holds only global rules that Mantine has no equivalent for (the JetBrains Mono
  `@fontsource` import and reserving scrollbar space). For component-specific styling, use a
  co-located CSS module (`component-name.module.css`) rather than adding to it.
- For router links, use `AnchorLink` / `ActionIconLink` from `src/components/link.tsx` instead of
  Mantine's `component={Link}`. The polymorphic `component` prop widens the router to `AnyRouter`
  and loses typed `to`/`params` inference; those wrappers use `createLink` to keep it.
- The default not found and error components are defined in `src/router.tsx` using Mantine's
  `EmptyState`.
