import { Link } from "@tanstack/react-router";
import { PackageCheck } from "lucide-react";

import { CopyCommand } from "@/components/templates/copy-command";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gitpickCommand } from "@/lib/gitpick";
import { cn } from "@/lib/utils";

function TemplateCard({
  name,
  description,
  dependencyCount,
  devDependencyCount,
}: {
  name: string;
  description: string;
  dependencyCount: number;
  devDependencyCount: number;
}) {
  return (
    <Card className={cn("relative transition-colors hover:ring-foreground/30 justify-between")}>
      <Link
        to="/$templateName"
        params={{ templateName: name }}
        className="absolute inset-0"
        aria-label={`View ${name} template`}
      />
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-mono">{name}</CardTitle>
          <PackageCheck className="size-4 shrink-0 text-muted-foreground" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-3">
        <CopyCommand command={gitpickCommand(name)} size="sm" />
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>
            <span className="text-foreground">{dependencyCount}</span> dependencies
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="text-foreground">{devDependencyCount}</span> dev dependencies
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { TemplateCard };
