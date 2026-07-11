import { Link } from "@tanstack/react-router";

import { CopyCommand } from "@/components/templates/copy-command";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gitpickCommand } from "@/lib/gitpick";
import { cn } from "@/lib/utils";

function TemplateCard({ name, description }: { name: string; description: string }) {
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
      </CardHeader>
      <CardContent className="relative">
        <CopyCommand command={gitpickCommand(name)} size="sm" />
      </CardContent>
    </Card>
  );
}

export { TemplateCard };
