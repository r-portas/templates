---
name: drizzle
description: Add Drizzle ORM with SQLite, wired into the project's env validation and src/lib conventions
---

# Drizzle

Sets up a database using Drizzle ORM with Bun's native SQLite driver, wired into the project's env
validation and `src/lib` conventions.

> Drizzle is currently in beta — install `drizzle-orm@beta` and `drizzle-kit@beta` exactly as
> shown below. Do not run `bun add drizzle-orm` without `@beta`.

## 1. Install dependencies

```bash
bun add drizzle-orm@beta
bun add -d drizzle-kit@beta
```

`drizzle-kit` is the CLI tool for schema pushes, migrations, and Drizzle Studio — dev dependency
only.

## 2. Add scripts

Add to `package.json`. The `bun --bun` prefix is required so drizzle-kit resolves the SQLite
driver through Bun's runtime rather than a Node.js shim:

```json
{
  "scripts": {
    "drizzle:push": "bun --bun drizzle-kit push",
    "drizzle:studio": "bun --bun drizzle-kit studio"
  }
}
```

## 3. Configure environment

Add `DATABASE_URL` to the server environment schema in `src/lib/env.server.ts`:

```ts
import { z } from "zod";

/**
 * Server-only environment variables.
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

export default serverEnvSchema.parse(process.env);
```

The database path is non-secret configuration, so it belongs in `.env` (committed) rather than
`.env.local`:

```bash
DATABASE_URL=file:./local.db
```

Add the database file to `.gitignore`:

```
local.db
```

## 4. Create the config

Create `drizzle.config.ts` at the project root:

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db.schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

This reads `process.env` directly rather than importing `@/lib/env.server` — drizzle-kit runs
outside the app, so it can't resolve the `@/` path alias. Bun loads `.env` automatically, so
`DATABASE_URL` is populated when the `bun --bun drizzle-kit` scripts run.

## 5. Define the schema

Create `src/lib/db.schema.ts`. Example table:

```ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notesTable = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  createdAt: int({ mode: "timestamp_ms" }).notNull(),
  updatedAt: int({ mode: "timestamp_ms" }).notNull(),
});
```

`int({ mode: "timestamp_ms" })` stores timestamps as milliseconds since epoch and maps them to JS
`Date` objects — assign `new Date()` or `Date.now()` directly.

## 6. Create the client

Create `src/lib/db.server.ts`. Use `drizzle-orm/bun-sqlite` — the Bun-native driver, not the
generic sqlite adapter:

```ts
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "@/lib/db.schema";
import env from "@/lib/env.server";

export const db = drizzle(env.DATABASE_URL, { schema });
```

Note that `env.server.ts` uses a **default export**, so this is `import env from`, not
`import { env } from`.

Passing `schema` enables relational queries via `db.query`. If you're only using the query
builder, it's optional.

## 7. Use it in `src/lib`

`db.server.ts` is server-only, so import it from other `*.server.ts` modules and expose the
results through server functions, following the existing `src/lib` domain convention:

```ts
// src/lib/notes.server.ts
import { db } from "@/lib/db.server";
import { notesTable } from "@/lib/db.schema";

export async function listNotes() {
  return await db.select().from(notesTable);
}
```

```ts
// src/lib/notes.functions.ts
import { createServerFn } from "@tanstack/react-start";

import { listNotes } from "@/lib/notes.server";

export const listNotesFn = createServerFn().handler(() => listNotes());
```

## 8. Push the schema

```bash
bun drizzle:push
```

For development this is the fast path: no migration files, just push and query. For production,
use `drizzle-kit generate` to produce tracked SQL migration files, then `drizzle-kit migrate` to
apply them.

Browse the database in Drizzle Studio:

```bash
bun drizzle:studio
```
