import { Link, linkOptions } from "@tanstack/react-router";
import { FolderGitIcon, InfoIcon } from "lucide-react";

const NAV_ITEMS = linkOptions([
  {
    to: "/",
    label: "Dashboard",
    icon: FolderGitIcon,
    activeOptions: { exact: true },
  },
  {
    to: "/about",
    label: "About",
    icon: InfoIcon,
    activeOptions: { exact: true },
  },
]);

export function Navbar() {
  return (
    <header className="border-b bg-card p-1">
      <nav className="flex items-center gap-2">
        {NAV_ITEMS.map(({ label, icon: Icon, ...linkOption }) => (
          <Link
            key={linkOption.to}
            {...linkOption}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "bg-secondary text-foreground" }}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
