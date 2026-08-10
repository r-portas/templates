import { Outlet } from "@tanstack/react-router";
import { Home, Settings } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import type { SidebarItem } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Home, title: "Home", to: "/", activeOptions: { exact: true } },
  { icon: Settings, title: "Settings", to: "/settings" },
];

/**
 * The app shell: a sidebar alongside the routed page content.
 *
 * @remarks
 * Rendered once from `__root.tsx`. Wraps `TooltipProvider` since `Sidebar` relies on it.
 */
function AppLayout() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}

export { AppLayout };
