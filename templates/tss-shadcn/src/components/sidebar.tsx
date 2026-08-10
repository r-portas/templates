import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface SidebarItem extends LinkProps {
  icon: LucideIcon;
  title: string;
}

interface SidebarProps extends ComponentProps<"nav"> {
  items: SidebarItem[];
}

/**
 * A full-height, icon-only navigation rail that sits alongside page content.
 *
 * @param items - Icons to render, each paired with a `title` shown as a tooltip on hover.
 *
 * @remarks
 * Requires the app to be wrapped in `TooltipProvider` (see `@/components/ui/tooltip`),
 * which is already set up in `__root.tsx`. Render it as a flex sibling of the page
 * content (e.g. `<div className="flex min-h-screen">`) so the two sit side by side.
 *
 * @example
 * ```tsx
 * <div className="flex min-h-screen">
 *   <Sidebar items={[{ icon: Home, title: "Home", to: "/" }]} />
 *   <main className="flex-1">...</main>
 * </div>
 * ```
 */
function Sidebar({ items, className, ...props }: SidebarProps) {
  return (
    <nav className={cn("flex h-screen flex-col gap-1 bg-primary p-2", className)} {...props}>
      {items.map(({ icon: Icon, title, ...linkProps }) => (
        <Tooltip key={title}>
          <TooltipTrigger
            render={
              <ButtonLink
                {...linkProps}
                variant="ghost"
                size="icon"
                aria-label={title}
                className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground [&_svg]:size-5"
              >
                <Icon />
              </ButtonLink>
            }
          />
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}

export { Sidebar };
