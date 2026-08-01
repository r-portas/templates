import { ClientOnly, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { addonPath } from "@/lib/addons";
import { cn } from "@/lib/utils";

import { CopyCommand } from "../copy-command";

function getAddonUrl(slug: string) {
  return new URL(addonPath(slug), window.location.origin).toString();
}

function AddonCard({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-mono">{name}</CardTitle>
          <Tooltip>
            <TooltipTrigger
              // `reloadDocument` because the target is a server route with no component
              render={
                <Link
                  to="/addons/$filename"
                  params={{ filename: `${slug}.md` }}
                  reloadDocument
                  aria-label={`View the raw markdown for the ${name} addon`}
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
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <AgentCommand slug={slug} />
        </ClientOnly>
      </CardContent>
    </Card>
  );
}

function AgentCommand({ slug }: { slug: string }) {
  const url = getAddonUrl(slug);
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
