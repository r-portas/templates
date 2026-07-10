# templates

A collection of starter templates for quickly bootstrapping new projects. Each
directory under [`./templates`](./templates) is a self-contained template that
can be pulled into a new project using [gitpick](https://github.com/nrjdalal/gitpick).

## Usage

Use `gitpick` to copy a template into a new directory. Replace `my-project` with
your desired project name:

```bash
bunx --bun gitpick r-portas/templates/tree/main/templates/<template> my-project
```

## Tooling

All templates share a common set of tooling:

- [Bun](https://bun.sh): runtime, package manager, and bundler
- [Oxlint](https://oxc.rs): linting
- [Oxfmt](https://oxc.rs): formatting

## Templates

| Name                                       | Description                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| [react](./templates/react)                 | A blank minimal React application                                       |
| [tss](./templates/tss)                     | A blank minimal TanStack Start application                              |
| [tss-tw](./templates/tss-tw)               | A blank minimal TanStack Start application configured with Tailwind CSS |
| [tss-mantine](./templates/tss-mantine)     | A blank minimal TanStack Start application configured with Mantine      |
| [tss-shadcn](./templates/tss-shadcn)       | A blank minimal TanStack Start application configured with Tailwind CSS and shadcn/ui |

## Scripts

Repository maintenance scripts live in [`./scripts`](./scripts):

| Script                                 | Description                                                                |
| -------------------------------------- | -------------------------------------------------------------------------- |
| [`update.sh`](./scripts/update.sh)     | Update every template's dependencies to the latest versions via `bun update --latest` |

Run from anywhere in the repo:

```bash
./scripts/update.sh
```

## Skills

[Claude Code](https://claude.com/claude-code) skills for maintaining this repo
live in [`./.claude/skills`](./.claude/skills). Invoke one by typing
`/<skill-name>` in Claude Code.

| Name                                                                          | Description                                                                                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [check-best-practises](./.claude/skills/check-best-practises/SKILL.md)         | Audits each template against the latest official docs for the libraries it uses and aligns them.  |