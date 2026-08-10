import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { getAddonFn } from "@/lib/addons.functions";
import { highlightMarkdownCode, highlightCss } from "@/lib/highlight";

export const Route = createFileRoute("/addons/$slug")({
  head: () => ({
    styles: [
      {
        children: highlightCss,
      },
    ],
  }),
  component: RouteComponent,
  loader: async ({ params }) => {
    const { slug } = params;
    try {
      // Don't include the raw markdown source, since only `document` is rendered and it can be large.
      const { content: _content, ...addon } = await getAddonFn({ data: slug });
      return { addon };
    } catch {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { addon } = Route.useLoaderData();
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <ButtonLink to="/" variant="ghost" className="w-fit">
          <ArrowLeft data-icon="inline-start" />
          Home
        </ButtonLink>
        <ButtonLink
          to="/addons/$slug/raw"
          params={{ slug: addon.slug }}
          reloadDocument
          variant="ghost"
          className="w-fit"
        >
          <FileText data-icon="inline-start" />
          View raw markdown
        </ButtonLink>
      </div>
      <div className="typeset typeset-docs">
        <Markdown highlighter={highlightMarkdownCode}>{addon.document}</Markdown>
      </div>
    </div>
  );
}
