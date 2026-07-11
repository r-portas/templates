import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { TemplateCard } from "@/components/templates/template-card";
import { buttonVariants } from "@/components/ui/button";
import { GITPICK_REPO } from "@/lib/gitpick";
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
      <p className="max-w-2xl text-muted-foreground">
        Click <span className="font-medium">copy to clipboard</span> on a template below and paste
        the command into a terminal. Replace <code className="font-mono">my-project</code> with the
        name of the folder you want created, or use <code className="font-mono">.</code> to scaffold
        into the current directory.
      </p>
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
    </div>
  );
}
