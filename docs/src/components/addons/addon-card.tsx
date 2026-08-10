import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";

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
import { addonPath } from "@/lib/addons";
import { cn } from "@/lib/utils";

function getAddonUrl(filename: string) {
  return new URL(addonPath(filename), window.location.origin).toString();
}

function AddonCard({ slug, description }: { slug: string; description: string }) {
  return (
    <Card className="justify-between">
      <CardHeader>
        <CardTitle className="font-mono">{slug}</CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  to="/addons/$slug/raw"
                  params={{ slug }}
                  reloadDocument
                  aria-label={`View the raw markdown for the ${slug} addon`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "text-muted-foreground hover:text-foreground",
                  )}
                />
              }
            >
              <FileText />
            </TooltipTrigger>
            <TooltipContent>View raw markdown</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  to="/addons/$slug"
                  params={{ slug }}
                  reloadDocument
                  aria-label={`View the details for the ${slug} addon`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "text-muted-foreground hover:text-foreground",
                  )}
                />
              }
            >
              <ArrowUpRight />
            </TooltipTrigger>
            <TooltipContent>View addon details</TooltipContent>
          </Tooltip>
        </CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <AgentCommand filename={`${slug}/raw`} />
        </ClientOnly>
      </CardContent>
    </Card>
  );
}

function AgentCommand({ filename }: { filename: string }) {
  const url = getAddonUrl(filename);
  return (
    <CopyCommand
      command={`Follow the setup instructions at ${url}`}
      size="sm"
      truncate={false}
      prefix=">"
    />
  );
}

export { AddonCard };
