import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

import { TemplateCard } from "@/components/template-card";
import { Button } from "@/components/ui/button";
import { GITPICK_REPO } from "@/lib/gitpick";
import { LINEAGE } from "@/lib/lineage";
import { listTemplatesFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => ({
    templates: await listTemplatesFn(),
  }),
});

function RouteComponent() {
  const { templates } = Route.useLoaderData();
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-16 sm:px-10">
      <section className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-mono text-4xl font-semibold">Roy's Templates</h1>
          <Button
            variant="ghost"
            size="sm"
            render={
              <a href={`https://github.com/${GITPICK_REPO}`} target="_blank" rel="noreferrer" />
            }
          >
            <GitBranch data-icon="inline-start" />
            GitHub
          </Button>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Click <span className="font-medium">copy to clipboard</span> on a template below and paste
          the command into a terminal. Replace <code className="font-mono">my-project</code> with
          the name of the folder you want created, or use <code className="font-mono">.</code> to
          scaffold into the current directory.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              name={template.name}
              description={template.description}
              parent={LINEAGE[template.name]?.parent ?? null}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
