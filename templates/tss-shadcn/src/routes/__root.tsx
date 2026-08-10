import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import clientEnv from "@/lib/env";

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
        title: clientEnv.VITE_APP_NAME,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-black text-yellow-400">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
