# CLAUDE.md

- This repo contains a collection of starter templates for quickly bootstrapping new projects
- Each directory under `./templates` is a self-contained template, which can be used to create a new project using tools like `gitpick`
- Aim to keep templates minimal, focused and consistent.
- All templates share a common set of tooling, including Bun, Oxlint and Oxfmt
- Templates build on each other, so changes should flow downstream through this lineage:
  - `react` is the base template
  - `tss` builds on `react`, adding TanStack Start
  - `tss-tw` and `tss-mantine` both build on `tss`, adding Tailwind CSS and Mantine respectively
- When making changes to a template consider:
  - Does this change apply to the template's base (per the lineage above)? If so, make the change there first, then propagate it downstream to each template that builds on it.
  - Should this change be made to any other templates? If so, make the change in all templates to keep them consistent.
  - Does the documentation need updating? The README.md file in each template should be kept up to date.
- When adding new template consider:
  - Is the root @README.md updated with the new template
  - Is the template added to the @.github/workflows/build.yml
