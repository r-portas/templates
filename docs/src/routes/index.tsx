import { createFileRoute } from "@tanstack/react-router";

import { AddonCard } from "@/components/addons/addon-card";
import { GettingStarted } from "@/components/getting-started";
import { Section } from "@/components/section";
import { TemplateCard } from "@/components/templates/template-card";
import { listAddonsFn } from "@/lib/addons.functions";
import { listTemplatesFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => ({
    templates: await listTemplatesFn(),
    addons: await listAddonsFn(),
  }),
});

function RouteComponent() {
  const { templates, addons } = Route.useLoaderData();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <h1 className="font-heading text-2xl font-semibold">Roy's Templates</h1>
      <Section title="Getting Started" description="Three steps to your first project.">
        <GettingStarted />
      </Section>
      <Section
        title="Templates"
        description="Self-contained starters, ready to pull into a new project."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard
              key={template.name}
              name={template.name}
              description={template.description}
              dependencyCount={Object.keys(template.dependencies).length}
              devDependencyCount={Object.keys(template.devDependencies).length}
            />
          ))}
        </div>
      </Section>
      <Section
        title="Addons"
        description="Optional setup steps to apply on top of a template. Copy the URL and point your coding agent at it."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addons.map((addon) => (
            <AddonCard key={addon.slug} {...addon} />
          ))}
        </div>
      </Section>
    </div>
  );
}
