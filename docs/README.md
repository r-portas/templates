# docs

The documentation site for this repository, listing the available templates and
addons. It is a TanStack Start application using Mantine, following the
[`tss-mantine`](../templates/tss-mantine) template.

The template list is generated at build time by reading the `package.json` of
each directory under `../templates` (see `src/lib/templates.server.ts`), and the
addon list is parsed from the markdown files under `../addons`.

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

The site is dark-only. Component-specific styling lives in a co-located CSS
module; `src/styles.css` is reserved for the few global rules Mantine has no
equivalent for.
