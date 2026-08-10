# docs

The documentation site for this repository, listing the available templates and
addons. It is a TanStack Start application using shadcn/ui and Tailwind CSS, following the
[`tss-shadcn`](../templates/tss-shadcn/) template.

The template list is generated at build time by reading the `package.json` of
each directory under `../templates` (see `src/lib/templates.server.ts`), and the
addon list is parsed from the markdown files under `../addons`.

## Getting Started

```bash
# Install dependencies
bun install

# Install the shadcn/ui skill
bunx --bun skills add shadcn/ui --global

# Start the development server
bun dev

# Update dependencies to the latest versions
bun run update
```

### Install Agent Browser

```bash
# Install the library globally
bun install -g agent-browser

# Download Chrome
agent-browser install

# Install the skill
bunx --bun skills add vercel-labs/agent-browser --global
```

### Update skills

```bash
bunx --bun skills update --global
```
