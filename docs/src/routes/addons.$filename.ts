import { createFileRoute } from "@tanstack/react-router";

import { isValidAddonFilename } from "@/lib/addons";
import { getAddon } from "@/lib/addons.server";

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
        if (!isValidAddonFilename(filename)) {
          return notFound();
        }

        try {
          const { content } = await getAddon(filename);
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
