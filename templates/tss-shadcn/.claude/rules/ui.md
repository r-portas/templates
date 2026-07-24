---
paths:
  - "src/**/*.{tsx,css}"
  - "components.json"
---

# User Interface

## Tailwind CSS

- This project uses Tailwind CSS (v4) for styling.
- Tailwind is configured CSS-first via `src/styles.css` (`@import "tailwindcss";`); there is no `tailwind.config.js`. Customise the theme with `@theme` in that file.
- Tailwind class sorting is handled by Oxfmt's `sortTailwindcss` option in `.oxfmtrc.json`, so classes are reordered automatically on format.

## shadcn/ui

- Configuration lives in `components.json`; components are added via `bunx --bun shadcn@latest add <component>` and installed into `src/components/ui`.
- The upstream shadcn skill is vendored into `.claude/skills/shadcn` — load it for component composition, styling and registry questions.
- UI primitives (e.g. `Button`) are built on `@base-ui/react`, not Radix. Base UI uses a `render` prop to swap the rendered element (e.g. `<Dialog.Trigger render={<a href="..." />}>`), **not** `asChild`. Using `asChild` silently does nothing and produces invalid nested markup (e.g. `<button><a>...</a></button>`).
- For links styled as buttons, use the `buttonVariants` helper on a plain `<a>` tag instead — do **not** wrap the anchor in `<Button render={<a/>} />`. `Button` forces `role="button"`, which overrides the anchor's native link semantics:
  ```tsx
  import { buttonVariants } from "@/components/ui/button"

  <a href="/somewhere" className={buttonVariants({ variant: "secondary", size: "sm" })}>
    Login
  </a>
  ```
