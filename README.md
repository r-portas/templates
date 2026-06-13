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
| `tss-rsbuild-empty` | An empty [TanStack Start](https://tanstack.com/start) app bundled with [RSBuild](https://rsbuild.dev), configured with TypeScript. | `bunx --bun gitpick r-portas/templates/tree/main/tss-rsbuild-empty my-project` |
| `tss-rsbuild-mantine` | A [TanStack Start](https://tanstack.com/start) app bundled with [RSBuild](https://rsbuild.dev), with [Mantine](https://mantine.dev) v9 preconfigured for SSR. | `bunx --bun gitpick r-portas/templates/tree/main/tss-rsbuild-mantine my-project` |
