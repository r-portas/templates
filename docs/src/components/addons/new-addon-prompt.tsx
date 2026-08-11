import { ClientOnly, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { CopyCommand } from "@/components/copy-command";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getAddonUrl, TEMPLATE_ADDON_SLUG } from "@/lib/addons";
import { cn } from "@/lib/utils";

/**
 * A copyable prompt that points a coding agent at the addon authoring template, for users who
 * want to draft a new addon of their own rather than apply an existing one.
 */
export function NewAddonPrompt() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-semibold">Write a New Addon</h3>
          <p className="text-sm text-muted-foreground">
            Paste this prompt into your coding agent to draft one, following the existing
            conventions.
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger
            render={
              <Link
                to="/addons/{$slug}.md"
                params={{ slug: TEMPLATE_ADDON_SLUG }}
                reloadDocument
                aria-label="View the raw addon authoring template"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon-sm" }),
                  "shrink-0 text-muted-foreground hover:text-foreground",
                )}
              />
            }
          >
            <FileText />
          </TooltipTrigger>
          <TooltipContent>View raw template</TooltipContent>
        </Tooltip>
      </div>
      <ClientOnly>
        <AgentPrompt />
      </ClientOnly>
    </div>
  );
}

function AgentPrompt() {
  const templateUrl = getAddonUrl(TEMPLATE_ADDON_SLUG);
  const prompt = `Draft a new addon following the template and conventions at ${templateUrl}. Ask me what the addon should set up before writing it.`;

  return <CopyCommand command={prompt} size="sm" truncate={false} prefix=">" />;
}
