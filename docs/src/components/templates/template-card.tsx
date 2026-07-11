import { Link } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

import { CopyCommand } from "@/components/templates/copy-command";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gitpickCommand } from "@/lib/gitpick";
import { cn } from "@/lib/utils";

function TemplateCard({
  name,
  description,
  parent,
}: {
  name: string;
  description: string;
  parent: string | null;
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
        <CardTitle className="font-mono">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          {parent ? (
            <Badge variant="secondary">
              <GitBranch data-icon="inline-start" />
              extends {parent}
            </Badge>
          ) : (
            <Badge variant="outline">base</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="relative">
        <CopyCommand command={gitpickCommand(name)} size="sm" />
      </CardContent>
    </Card>
  );
}

export { TemplateCard };
