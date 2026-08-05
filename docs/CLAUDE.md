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
