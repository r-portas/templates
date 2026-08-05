# tss

A blank minimal TanStack Start application.

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
