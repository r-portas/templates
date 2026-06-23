# templates

A collection of starter templates for quickly bootstrapping new projects. Each
top-level directory is a self-contained template that can be pulled into a new
project using [gitpick](https://github.com/nrjdalal/gitpick).

## Usage

Use `gitpick` to copy a template into a new directory. Replace `my-project` with
your desired project name:

```bash
bunx --bun gitpick r-portas/templates/tree/main/<template> my-project
```

## Tooling

All templates share a common set of tooling:

- [Bun](https://bun.sh): runtime, package manager, and bundler
- [Oxlint](https://oxc.rs): linting
- [Oxfmt](https://oxc.rs): formatting

## Scripts

Repository maintenance scripts live in [`./scripts`](./scripts):

| Script                                 | Description                                                                |
| -------------------------------------- | -------------------------------------------------------------------------- |
| [`update.sh`](./scripts/update.sh)     | Update every template's dependencies to the latest versions via `bun update --latest` |

Run from anywhere in the repo:

```bash
./scripts/update.sh
```

## Templates

| Name                         | Description                                                             |
| ---------------------------- | ---------------------------------------------------------------------- |
| [react](./react)             | A blank minimal React application                                       |
| [tss](./tss)                 | A blank minimal TanStack Start application                              |
| [tss-tw](./tss-tw)           | A blank minimal TanStack Start application configured with Tailwind CSS |
| [tss-mantine](./tss-mantine) | A blank minimal TanStack Start application configured with Mantine      |
