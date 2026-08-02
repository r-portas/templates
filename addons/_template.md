---
name: my-addon
description: One-line summary of what this addon does — this exact text is shown on the docs site's addon cards, so keep it accurate and short.
---

# My Addon

One or two sentences on what this addon achieves and why a project might want it. This is prose
for a human skimming the docs site, so keep it brief — the steps below are the actual instructions.

> Only include this blockquote if there's something critical an agent could get wrong before it
> even starts: a required version pin, a flag that must not be omitted, an ordering constraint
> with another addon. If there's nothing like that, omit the blockquote entirely — most addons
> won't need one.

## 1. First step title

Instructions for the first step — commands, code blocks, and any explanation needed to get it
right. Steps are numbered `##` headings directly under the title: no wrapping "## Steps" parent
heading, no nested `###` sub-headings.

```bash
bun add some-package
```

## 2. Second step title

Keep going with one `##` heading per discrete step, in the order an agent should perform them.
Fold any addon-specific caveats into the step they apply to (inline notes or nested blockquotes),
rather than hoisting everything into the top-level callout — that callout is reserved for things
that matter _before_ starting, not per-step detail.

## 3. Verify

Most addons should end with a step that confirms the change worked — usually the project's
existing `format`, `lint`, and `build` scripts, or a more specific check if the addon needs one.

```bash
bun run lint
bun run build
```

---

Notes for authoring a new addon from this template:

- Keep the YAML frontmatter block at the very top. It isn't decorative — `docs/src/lib/addons.ts`
  parses it and `docs/src/lib/addons.schemas.ts` requires non-empty `name` and `description` to
  build the docs site's addon list. `name` should match the filename stem (`my-addon.md` →
  `name: my-addon`).
- Add the new addon to the root `README.md` addons table.
- Follow the general guidance in `CLAUDE.md` for addons: match the conventions used by the `app`
  template (`src/lib` domain naming, Zod-validated env in `src/lib/env.server.ts`).
