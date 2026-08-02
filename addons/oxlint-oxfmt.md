---
name: oxlint-oxfmt
description: Replace ESLint and Prettier with oxlint and oxfmt, including editor and Claude Code integration
---

# oxfmt + oxlint

Replaces ESLint and Prettier with oxlint and oxfmt — oxfmt and oxlint are always configured
together, oxfmt for formatting and oxlint for linting.

## 1. Install as dev dependencies

```bash
bun add -D oxfmt oxlint
```

## 2. Add scripts to `package.json`

```json
{
  "scripts": {
    "format": "oxfmt .",
    "lint": "oxlint ."
  }
}
```

## 3. Create config files

`.oxfmtrc.json`:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "ignorePatterns": ["*.gen.ts"],
  "sortImports": true,
  "sortTailwindcss": {
    "stylesheet": "./src/styles.css",
    "functions": ["cn"]
  }
}
```

- Drop `sortTailwindcss` entirely if the project doesn't use Tailwind CSS. If it does, point
  `stylesheet` at the file containing the `@import "tailwindcss"` directive, and list any helpers
  that take class strings in `functions` (`cn` is the shadcn/ui convention).
- `ignorePatterns` keeps generated files such as TanStack Router's `routeTree.gen.ts` untouched —
  adjust or remove to match the project.

`.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["eslint", "jsdoc", "react", "react-perf"]
}
```

> Add the `nextjs` plugin if the project uses Next.js. Drop `react` and `react-perf` if it isn't
> a React project.

## 4. VS Code setup

`.vscode/extensions.json`:

```json
{
  "recommendations": ["oxc.oxc-vscode"]
}
```

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## 5. Auto-format on save with a Claude hook (optional)

A `PostToolUse` hook formats files with oxfmt every time Claude writes or edits one.

Only configure this if the repo shows signs of using Claude Code (e.g. a `CLAUDE.md` file or an
existing `.claude/` directory). If there are no such signs, ask the user whether they want the
hook configured before adding it.

`.claude/settings.json`:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs $CLAUDE_PROJECT_DIR/node_modules/.bin/oxfmt",
            "statusMessage": "Formatting..."
          }
        ]
      }
    ]
  }
}
```

> oxfmt ignores files it doesn't support, so the hook can run on every edit without filtering by extension.

## 6. Verify

```bash
bun run format
bun run lint
```

## 7. Remove old Prettier / ESLint

- Delete config files: `.prettierrc`, `.eslintrc`, `eslint.config.*`, etc.
- Remove packages: `prettier`, `eslint`, and related plugins from `package.json`
- Run `bun install` to clean up `node_modules`
