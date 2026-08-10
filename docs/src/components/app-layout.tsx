import { Outlet } from "@tanstack/react-router";
import { Home } from "lucide-react";

import { Sidebar } from "@/components/ui/sidebar";
import type { SidebarItem } from "@/components/ui/sidebar";

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Home, title: "Home", to: "/", activeOptions: { exact: true } },
];

/**
 * The app shell: a sidebar alongside the routed page content.
 *
 * @remarks
 * Rendered once from `__root.tsx`.
 */
function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={SIDEBAR_ITEMS} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
