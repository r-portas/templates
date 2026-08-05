# tss-mantine

An opinionated, batteries-included template for building new web apps, using
TanStack Start and Mantine.

## Getting Started

```bash
# Install dependencies
bun install

# Copy the example env file and fill in any secrets
cp .env.local.example .env.local

# Start the development server
bun dev

# Update dependencies to the latest versions
bun run update
```

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get started.

They are validated with Zod on startup:

- `src/lib/env.ts` — variables readable on the client, which must be prefixed with `VITE_`
- `src/lib/env.server.ts` — server-only variables

## Project structure

`src/lib` holds library code grouped by domain. For a `todos` domain, for
example:

- `todos.server.ts` — server-only code
- `todos.functions.ts` — a thin wrapper exposing server functions from `todos.server.ts`
- `todos.schemas.ts` — Zod schemas for the domain
- `todos.ts` — isomorphic code that can run on either the client or server

## User interface

UI components come from [Mantine](https://mantine.dev), which needs no install
step — import what you need from `@mantine/core`. Icons come from
[Phosphor](https://phosphoricons.com) via `@phosphor-icons/react`.

- `src/lib/theme.ts` — the Mantine theme, applied by the `MantineProvider` in `src/routes/__root.tsx`
- `src/components/app-layout.tsx` — the `AppShell` wrapper
- `src/components/navbar.tsx` — the header bar and its navigation links
- `src/router.tsx` — the default not found and error components
