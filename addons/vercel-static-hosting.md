---
name: vercel-static-hosting
description: Configures Vercel for static hosting of a Bun project, including build and output settings
---

# Vercel Static Hosting

Configures Vercel for static hosting of a Bun project, including build and output settings.

## 1. Create the `vercel.json` file

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build",
  "outputDirectory": "dist/client",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 2. Configure prerendering in the `vite.config.ts`

Set the `prerender` option in the `tanstackStart` plugin.

```ts
export default defineConfig({
  ...
  plugins: [
    ...
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  ],
});
```
