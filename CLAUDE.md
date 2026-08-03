# CLAUDE.md

- This repo contains a collection of starter templates for quickly bootstrapping new projects
- Each directory under `./templates` is a self-contained template, which can be used to create a new project using tools like `gitpick`
- Aim to keep templates minimal, focused and consistent.
- All templates share a common set of tooling, including Bun, Oxlint and Oxfmt
- The repo root is a [Bun workspace](https://bun.sh/docs/install/workspaces) (see @package.json), with each template and `./docs` as a workspace package. Use the root scripts to operate across all of them at once:
  - `bun run update`: update every template's dependencies to the latest versions
  - `bun run lint`: lint every template
  - `bun run build`: build every template, verifying it still works
- Templates build on each other, so changes should flow downstream through this lineage:
  - `react` is the base template
  - `tss` builds on `react`, adding TanStack Start
  - `tss-tw` and `tss-mantine` both build on `tss`, adding Tailwind CSS and Mantine respectively
  - `tss-shadcn` builds on `tss-tw`, adding shadcn/ui
  - `app` builds on `tss-shadcn`, adding a more opinionated, batteries-included setup for building new web apps
  - `./docs` (the documentation site, outside `./templates`) is built on `tss-shadcn`, so it sits at the end of this lineage too
- When making changes to a template consider:
  - Does this change apply to the template's base (per the lineage above)? If so, make the change there first, then propagate it downstream to each template that builds on it.
  - Should this change be made to any other templates? If so, make the change in all templates to keep them consistent.
  - Does the change apply to `./docs`? Since it builds on `tss-shadcn`, any change made to `tss-shadcn` should generally be migrated over to `./docs` as well.
  - Does the documentation need updating? The README.md file in each template should be kept up to date.
- Each markdown file under `./addons` is an optional setup step that is only needed on some
  projects (e.g. a database, a Dockerfile, a test framework), written as instructions for a
  coding agent to follow. Addons deliberately live outside `./templates` so the templates stay
  minimal.
  - Keep addons consistent with the templates: if an addon configures a tool the templates also
    use, the config it writes should match what the templates already have.
- When adding a new addon consider:
  - Is the root @README.md addons table updated
  - Does the addon target the conventions used by the `app` template
    (`src/lib` domain naming, Zod-validated env in `src/lib/env.server.ts`)
- When adding a new template consider:
  - Is the root @README.md updated with the new template
  - Is the template added to the @.github/workflows/build.yml
  - Is the template's lineage recorded in the list above
  - Is the template (and its dependencies to check) added to @.claude/skills/check-best-practises/SKILL.md
- For repo-wide changes (e.g. a shared convention or dependency bump), check every workspace package,
  not just `./templates/*` — `./docs` is easy to miss since it lives outside `./templates`. Scope
  searches to the repo root; never run `find` or similar from `/` or `~`.
- Keep changes to the smallest diff that satisfies the request — avoid adding abstractions,
  memoization, or verbose comments/docstrings that aren't already conventional in the surrounding
  code, in keeping with the "minimal, focused" goal above.
