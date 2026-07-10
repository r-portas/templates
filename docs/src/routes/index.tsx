import { createFileRoute } from "@tanstack/react-router";

import { TemplateCard } from "@/components/template-card";
import { LINEAGE } from "@/lib/lineage";
import { listTemplatesFn } from "@/lib/templates";

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
        <h1 className="font-mono text-4xl font-semibold">Roy's Templates</h1>
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
