import { createFileRoute, notFound } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { CopyCommand } from "@/components/templates/copy-command";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { githubUrl, gitpickCommand } from "@/lib/gitpick";
import { getTemplatePackageJsonFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/$templateName")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const template = await getTemplatePackageJsonFn({ data: params.templateName });
      return {
        template,
      };
    } catch {
      throw notFound();
    }
  },
});

function DependencyList({ dependencies }: { dependencies: Record<string, string> }) {
  const entries = Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">None</p>;
  }
  return (
    <ul className="flex flex-col gap-1 font-mono text-sm">
      {entries.map(([name, version]) => (
        <li key={name} className="flex items-baseline justify-between gap-4">
          <a
            href={`https://npmx.dev/package/${name}`}
            target="_blank"
            rel="noreferrer"
            className="truncate text-foreground underline-offset-2 hover:underline"
          >
            {name}
          </a>
          <span className="shrink-0 text-muted-foreground">{version}</span>
        </li>
      ))}
    </ul>
  );
}

function RouteComponent() {
  const { template } = Route.useLoaderData();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16 sm:px-10">
      <PageHeader
        title={template.name}
        titleId={template.name}
        breadcrumb={{ label: "All templates", to: "/" }}
        action={
          <a
            href={githubUrl(template.name)}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <GitBranch data-icon="inline-start" />
            GitHub
          </a>
        }
      />
      <p className="max-w-2xl text-muted-foreground">{template.description}</p>

      <CopyCommand command={gitpickCommand(template.name)} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dependencies</CardTitle>
            <CardAction>
              <Badge variant="secondary">{Object.keys(template.dependencies).length}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <DependencyList dependencies={template.dependencies} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dev dependencies</CardTitle>
            <CardAction>
              <Badge variant="secondary">{Object.keys(template.devDependencies).length}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <DependencyList dependencies={template.devDependencies} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
