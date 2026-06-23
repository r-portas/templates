---
name: check-best-practises
description: Checks the alignment of templates against best practises, use this skill to keep the templates up to date and aligned with the latest versions of libraries used in the templates.
---

## General Guidance

- Inspect the `package.json` files to identify the dependencies and the version used
- Search online for the official documentation of the dependency and check the usage of the library aligns with the best practices recommended by the library maintainers.
- When aligning a library with the best practice, make sure to tell the user about the changes you made, the reason behind the changes and links to the documentation you used.
- Work from the most basic template to the most complex one, replicate the changes to the other templates that use the library
- Make sure to run the `format`, `lint` and `build` scripts after updating the template to verify it still works.

## Templates

- Below is a guide for what order to check the templates in, and what dependencies to check for each template:
  - `react`: The most basic template, check the following dependencies:
    - `vite`: https://vite.dev/llms.txt
    - `@vitejs/plugin-react`: https://raw.githubusercontent.com/vitejs/vite-plugin-react/refs/heads/main/packages/plugin-react/README.md
    - `typescript`
    - `oxfmt`: https://oxc.rs/llms.txt
    - `oxlint`: https://oxc.rs/llms.txt
  - `tss`: Builds off the `react` template adding TanStack Start, check the following dependencies:
    - `@tanstack/react-router`: https://tanstack.com/router/latest/llms.txt
    - `@tanstack/react-start`: https://tanstack.com/start/latest/llms.txt
  - `tss-tw`: Builds off the `tss` template adding Tailwind, check the following dependencies:
    - `tailwindcss`
    - `@tailwindcss/vite`
  - `tss-mantine`: Builds off the `tss` template adding Mantine, check the following dependencies:
    - `@mantine/core`: https://mantine.dev/llms.txt
    - `@mantine/hooks`: https://mantine.dev/llms.txt
    - `@phosphor-icons/react`
    - `postcss-preset-mantine`
    - `postcss-simple-vars`