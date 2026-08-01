import { Link } from "@tanstack/react-router";
import { Check, Copy, FileText } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { addonPath } from "@/lib/addons";
import { cn } from "@/lib/utils";

function AddonCard({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  const { copied, copy } = useCopyToClipboard();
  const path = addonPath(slug);

  // Resolved on click rather than at render so `window` is untouched during SSR, and so preview
  // deployments copy their own origin rather than production's.
  function handleCopy() {
    return copy(new URL(path, window.location.origin).toString());
  }

  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="font-mono">{name}</CardTitle>
          <div className="flex shrink-0 items-center gap-1">
            <Tooltip>
              <TooltipTrigger
                // `reloadDocument` because the target is a server route with no component —
                // client-side navigating to it would render nothing. Rendering a real anchor is
                // also what lets the prerender crawler discover and emit the markdown.
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
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Addon URL copied" : `Copy the URL for the ${name} addon`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon-sm" }),
                  "text-muted-foreground hover:text-foreground",
                )}
              >
                {copied ? <Check className="text-primary" /> : <Copy />}
              </TooltipTrigger>
              <TooltipContent>{copied ? "Copied" : "Copy URL"}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-mono text-xs text-muted-foreground">{path}</p>
      </CardContent>
    </Card>
  );
}

export { AddonCard };
