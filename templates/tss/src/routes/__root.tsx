import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import clientEnv from "@/lib/env";

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
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
