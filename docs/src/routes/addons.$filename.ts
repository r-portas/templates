import { createFileRoute } from "@tanstack/react-router";

import { isValidAddonSlug } from "@/lib/addons";
import { getAddon } from "@/lib/addons.server";

const EXTENSION = ".md";

function notFound() {
  return new Response("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export const Route = createFileRoute("/addons/$filename")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { filename } = params;
        if (!filename.endsWith(EXTENSION)) {
          return notFound();
        }

        // `filename` is user supplied and feeds a filesystem read, so reject anything that isn't
        // a plain slug before it reaches `getAddon`.
        const slug = filename.slice(0, -EXTENSION.length);
        if (!isValidAddonSlug(slug)) {
          return notFound();
        }

        try {
          const { content } = await getAddon(slug);
          return new Response(content, {
            headers: { "Content-Type": "text/markdown; charset=utf-8" },
          });
        } catch {
          return notFound();
        }
      },
    },
  },
});
