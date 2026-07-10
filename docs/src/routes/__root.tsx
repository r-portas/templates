import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Roy's Templates",
      },
      {
        name: "description",
        content:
          "A quick reference to the templates repo — browse each starter and copy its gitpick command.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider>{children}</TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
