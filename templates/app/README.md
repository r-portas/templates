# app

An opinionated, batteries-included template for spinning up new apps.

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

## Project structure

`src/lib` holds library code grouped by domain. For a `todos` domain, for
example:

- `todos.server.ts` — server-only code
- `todos.functions.ts` — a thin wrapper exposing server functions from `todos.server.ts`
- `todos.schemas.ts` — Zod schemas for the domain
- `todos.ts` — isomorphic code that can run on either the client or server

## Adding components

Add shadcn/ui components with the CLI:

```bash
bunx --bun shadcn add <component>
```

## AI assistant skill

Install the [shadcn/ui skill](https://ui.shadcn.com/docs/skills) to give AI assistants like Claude Code project-aware context about this template's shadcn/ui setup:

```bash
bunx --bun skills add shadcn/ui
```

Once installed, the assistant reads this project's `components.json` to find, install, compose, and customize components using the correct APIs and patterns.
