import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

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
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
