import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

import { AddonCard } from "@/components/addons/addon-card";
import { GettingStarted } from "@/components/getting-started";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { TemplateCard } from "@/components/templates/template-card";
import { buttonVariants } from "@/components/ui/button";
import { listAddonsFn } from "@/lib/addons.functions";
import { GITPICK_REPO } from "@/lib/gitpick";
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
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16 sm:px-10">
      <PageHeader
        title="Roy's Templates"
        action={
          <a
            href={`https://github.com/${GITPICK_REPO}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <GitBranch data-icon="inline-start" />
            GitHub
          </a>
        }
      />
      <Section title="Getting started" description="Three steps to your first project.">
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
            <AddonCard
              key={addon.slug}
              slug={addon.slug}
              name={addon.name}
              description={addon.description}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
