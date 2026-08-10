import { Link } from "@tanstack/react-router";
import { PackageCheck } from "lucide-react";

import { CopyCommand } from "@/components/copy-command";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gitpickCommand } from "@/lib/gitpick";

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
    <Card className="relative justify-between transition-colors hover:ring-foreground/30">
      <Link
        to="/templates/$templateName"
        params={{ templateName: name }}
        className="absolute inset-0"
        aria-label={`View ${name} template`}
      />
      <CardHeader>
        <CardTitle className="pointer-events-none font-mono">{name}</CardTitle>
        <CardAction>
          <PackageCheck className="size-4 text-muted-foreground" />
        </CardAction>
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
