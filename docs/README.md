# docs

The documentation site for this repository, listing the available templates and
addons. It is a TanStack Start application using Mantine, following the
[`tss-mantine`](../templates/tss-mantine) template.

The template list is generated at build time by reading the `package.json` of
each directory under `../templates` (see `src/lib/templates.server.ts`), and the
addon list is parsed from the markdown files under `../addons`.

## Theme builder

`/theme` is an interactive builder for the colour half of a Mantine theme. Pick
a primary and a neutral colour and it emits a `createTheme` block ready to drop
into a project as `src/lib/theme.ts`.

- `src/lib/palette.ts` — expands a hue and a chroma into ten shades along a
  fixed OKLCH lightness ramp, using [culori](https://culorijs.org) to clamp each
  shade into sRGB and format it as hex
- `src/lib/theme-builder.ts` — turns the editor's config into a preview theme
  and into the copyable snippet
- `src/components/theme-builder/theme-preview.tsx` — scopes the generated theme
  to the preview subtree with a nested `MantineProvider`, so the surrounding
  site keeps its own palette

## Getting Started

```bash
# Install dependencies
bun install

# Start the development server
bun dev

# Run the tests
bun test

# Update dependencies to the latest versions
bun run update
```

## Environment variables

Non-secret configuration lives in `.env`, which is committed in git and
validated with Zod in `src/lib/env.ts`. Variables must be prefixed with `VITE_`
to be readable on the client.

## User interface

UI components come from [Mantine](https://mantine.dev), which needs no install
step — import what you need from `@mantine/core`. Icons come from
[Phosphor](https://phosphoricons.com) via `@phosphor-icons/react`.

- `src/lib/theme.ts` — the Mantine theme, applied by the `MantineProvider` in `src/routes/__root.tsx`
- `src/components/link.tsx` — Mantine components wired up as typed router links via `createLink`
- `src/router.tsx` — the default not found and error components

The site is light-only, on a monochrome palette ported from shadcn's neutral
theme, set in Inter with JetBrains Mono for code. Component-specific styling
lives in a co-located CSS module; `src/styles.css` is reserved for the few
global rules Mantine has no equivalent for.
