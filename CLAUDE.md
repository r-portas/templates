# CLAUDE.md

- This repo contains a collection of starter templates for quickly bootstrapping new projects
- Each directory under `./templates` is a self-contained template, which can be used to create a new project using tools like `gitpick`
- Aim to keep templates minimal, focused and consistent.
- All templates share a common set of tooling, including Bun, Oxlint and Oxfmt
- When making changes to a template consider:
  - Should this change be made to any other templates? If so, make the change in all templates to keep them consistent.
  - Does the documentation need updating? The README.md file in each template should be kept up to date.
- When adding new template consider:
  - Is the root @README.md updated with the new template
  - Is the template added to the @.github/workflows/build.yml
