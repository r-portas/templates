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

## Templates

| Name | Description | Setup |
| --- | --- | --- |
| `tss-rsbuild-empty` | An empty [TanStack Start](https://tanstack.com/start) app bundled with [RSBuild](https://rsbuild.dev), configured with TypeScript, [oxlint](https://oxc.rs) for linting, and [oxfmt](https://oxc.rs) for formatting. | `bunx --bun gitpick r-portas/templates/tree/main/tss-rsbuild-empty my-project` |
