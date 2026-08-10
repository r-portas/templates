import { ClientOnly, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

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

function AddonCard({
  filename,
  name,
  description,
}: {
  filename: string;
  name: string;
  description: string;
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
                  to="/addons/$filename"
                  params={{ filename }}
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
        </CardAction>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientOnly>
          <AgentCommand filename={filename} />
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
