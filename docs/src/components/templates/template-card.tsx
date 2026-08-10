import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CopyCommand } from "@/components/copy-command";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
    <Card className="justify-between">
      <CardHeader>
        <CardTitle className="font-mono">{name}</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  to="/templates/$templateName"
                  params={{ templateName: name }}
                  aria-label={`View ${name} template`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "text-muted-foreground hover:text-foreground",
                  )}
                />
              }
            >
              <ArrowUpRight />
            </TooltipTrigger>
            <TooltipContent>View template</TooltipContent>
          </Tooltip>
        </CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
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
