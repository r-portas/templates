# docs

The documentation site for this repository, listing the available templates and
addons. It is a TanStack Start application configured with Tailwind CSS and
shadcn/ui.

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

## Adding components

Add shadcn/ui components with the CLI:

```bash
bunx --bun shadcn add <component>
```

## AI assistant skill

Install the [shadcn/ui skill](https://ui.shadcn.com/docs/skills) to give AI assistants like Claude Code project-aware context about this project's shadcn/ui setup:

```bash
bunx --bun skills add shadcn/ui
```

Once installed, the assistant reads this project's `components.json` to find, install, compose, and customize components using the correct APIs and patterns.
