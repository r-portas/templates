import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  define: {
    "import.meta.env.VITE_GIT_BRANCH": JSON.stringify(process.env.VERCEL_GIT_COMMIT_REF ?? ""),
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    react(),
  ],
});
