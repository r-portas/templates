import type { LinkProps } from "@tanstack/react-router";
import { GitBranchIcon, LayoutTemplate, type LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GITPICK_REPO } from "@/lib/gitpick";
import { cn } from "@/lib/utils";

/** Placeholder app icon shown at the top of the sidebar — swap for your app's own logo/icon. */
const APP_ICON = LayoutTemplate;

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
    <nav
      className={cn(
        "flex h-screen flex-col gap-1 border-r border-sidebar-border bg-sidebar p-2",
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <APP_ICON className="size-5" />
      </div>
      {items.map(({ icon: Icon, title, ...linkProps }) => (
        <Tooltip key={title}>
          <TooltipTrigger
            render={
              <ButtonLink
                {...linkProps}
                aria-label={title}
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground [&_svg]:size-5"
              >
                <Icon />
              </ButtonLink>
            }
          />
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      ))}

      <div className="mt-auto">
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                aria-label="Open GitHub repo"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground [&_svg]:size-5",
                })}
                href={`https://github.com/${GITPICK_REPO}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranchIcon />
              </a>
            }
          />
          <TooltipContent side="right">Open GitHub repo</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}

export { Sidebar };
