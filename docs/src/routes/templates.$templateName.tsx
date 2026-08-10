import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, GitBranch } from "lucide-react";

import { CopyCommand } from "@/components/copy-command";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { githubUrl, gitpickCommand } from "@/lib/gitpick";
import { getTemplatePackageJsonFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/templates/$templateName")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const template = await getTemplatePackageJsonFn({ data: params.templateName });
      return { template };
    } catch {
      throw notFound();
    }
  },
});

function DependencyList({ dependencies }: { dependencies: Record<string, string> }) {
  const entries = Object.entries(dependencies).toSorted(([a], [b]) => a.localeCompare(b));
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
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <ButtonLink to="/" variant="ghost" className="w-fit">
        <ArrowLeft data-icon="inline-start" />
        Home
      </ButtonLink>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">{template.name}</h1>
          <p className="max-w-2xl text-muted-foreground">{template.description}</p>
        </div>
        <a
          href={githubUrl(template.name)}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "ghost" })}
        >
          <GitBranch data-icon="inline-start" />
          GitHub
        </a>
      </div>

      <CopyCommand command={gitpickCommand(template.name)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dependencies</CardTitle>
            <CardAction>
              <Badge variant="outline">{Object.keys(template.dependencies).length}</Badge>
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
              <Badge variant="outline">{Object.keys(template.devDependencies).length}</Badge>
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
