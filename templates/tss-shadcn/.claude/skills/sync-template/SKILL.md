# Sync with the upstream template

This project was created from a template in https://github.com/r-portas/templates using
`gitpick`, which copies files but leaves no git history connecting this project back to the
template. This skill re-establishes that link and pulls in changes made to the template since
this project was created.

## 1. Read or create the sync marker

Look for `.claude/template-sync.json` in the project root. It looks like:

```json
{
  "template": "tss-shadcn",
  "repo": "https://github.com/r-portas/templates",
  "baseCommit": "<sha>"
}
```

Projects created with `bunx --bun github:r-portas/templates <template> <dir>` already have this
file, stamped with the exact commit the template was copied from — skip straight to step 2.

If it doesn't exist (the project was created another way, e.g. `gitpick`), bootstrap it:

1. Infer `template` from the `name` field in the project's `package.json`. It should be one of
   `react`, `tss`, `tss-tw`, `tss-shadcn`. If the name doesn't match one of these (the project was
   renamed), ask the user which template this project is based on.
2. Determine `baseCommit`:
   - Ask the user roughly when this project was created.
   - Clone the upstream repo (see step 2) and find the last commit on `main` before that date that
     touched `templates/<template>/**`, via `git log --before=<date> -1 -- templates/<template>`.
   - If the user doesn't know, default `baseCommit` to the current upstream `main` HEAD, and tell
     them that changes made to the template before today won't be picked up by this first sync.
3. Write `.claude/template-sync.json` with the resolved `template`, `repo`, and `baseCommit`.

## 2. Fetch the upstream template

Clone the upstream repo into a scratch directory (not inside the project):

```bash
git clone https://github.com/r-portas/templates.git /tmp/template-sync-<random>
```

Use the HTTPS URL, not SSH — the user running this skill won't have push access or SSH keys set
up for this repo, and only a read-only clone is needed.

## 3. Diff since the base commit

Diff the template's directory between `baseCommit` and `main`, restricted to this project's
template:

```bash
git -C /tmp/template-sync-<random> diff <baseCommit>..main -- templates/<template>
```

Because templates build on each other (`react` → `tss` → `tss-tw` → `tss-shadcn`), a change made
upstream in a base template is propagated downstream as its own ordinary commit touching
`templates/<template>/**`. Diffing this one directory is enough — no extra lineage handling is
needed.

Skip these paths entirely, they should never be synced:

- `dist/` (build output)
- `bun.lock` (lockfile — dependency versions are the project's own to manage via `bun run update`)
- `.env.local` (gitignored/secret, won't appear in the template's git history anyway)

For `package.json`, ignore hunks that are pure dependency version bumps (those are handled by
`bun run update`), but do apply hunks that change scripts, add/remove dependencies, or otherwise
change structure.

## 4. Walk through the remaining changes one file at a time

For each changed file (map `templates/<template>/<path>` to `<path>` in this project):

- **Modified upstream:** compare the project's current file against the file at `baseCommit`
  (`git -C /tmp/template-sync-<random> show <baseCommit>:templates/<template>/<path>`):
  - If they match — no local customization — apply the upstream version directly.
  - If they differ — the file has local customization — show both the upstream diff and how the
    local file diverged from the base, then merge the upstream change in while preserving the
    local customization. If the merge is ambiguous or risky, skip it and note it for manual
    review instead of guessing.
- **Added upstream:** add the new file, unless a file already exists at that path with unrelated
  content (a naming collision) — flag that for manual review instead of overwriting it.
- **Deleted upstream:** confirm with the user before deleting the local file, in case it was
  customized and is still wanted.

## 5. Wrap up

1. Update `.claude/template-sync.json`'s `baseCommit` to upstream `main`'s current SHA.
2. Remove the scratch clone directory.
3. Report a summary to the user: files applied, files added, files skipped for manual review (with
   reasons), and files where deletion was skipped.

This skill is safe to re-run — each run only considers changes since the last recorded
`baseCommit`.
