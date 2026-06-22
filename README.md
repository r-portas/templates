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

## Templates

| Name | Description | Setup |
| --- | --- | --- |
| [tss](./tss) | A blank minimal TanStack Start application | `bun install` |
