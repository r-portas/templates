# tss-tw

A blank minimal TanStack Start application configured with Tailwind CSS.

## Getting Started

```bash
# Install dependencies
bun install

# Start the development server
bun dev
```

## Claude Code

[Claude Code](https://claude.com/claude-code) configuration ships with this
template, so nothing needs to be set up at the user level:

- `CLAUDE.md` — project instructions, loaded into every session
- `.claude/settings.json` — pre-approved commands and the format-on-write hook
- `.claude/hooks/format.ts` — runs Oxfmt over files Claude writes
- `.claude/launch.json` — dev server launch configuration
- `.claude/rules/ui.md` — UI conventions, loaded when working on `src/**/*.{tsx,css}`
- `.intent/hooks/` — TanStack Intent skill-loading gate
