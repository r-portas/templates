import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function CopyCommand({
  command,
  className,
  size = "default",
}: {
  command: string;
  className?: string;
  size?: "default" | "sm";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      data-slot="copy-command"
      className={cn(
        "flex w-full items-center gap-3 rounded-md border border-border bg-muted/40 font-mono",
        size === "default"
          ? "py-2 pr-2 pl-4 text-[0.8rem] sm:text-sm"
          : "py-1.5 pr-1.5 pl-3 text-xs",
        className,
      )}
    >
      <span aria-hidden="true" className="shrink-0 text-muted-foreground select-none">
        $
      </span>
      <span className="min-w-0 flex-1 truncate text-foreground">{command}</span>
      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Command copied" : `Copy command: ${command}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: size === "default" ? "icon-sm" : "icon-xs" }),
            "shrink-0 text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? <Check className="text-primary" /> : <Copy />}
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
      </Tooltip>
    </div>
  );
}
