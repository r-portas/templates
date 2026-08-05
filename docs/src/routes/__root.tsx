import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import "@mantine/core/styles.css";
import clientEnv from "@/lib/env";
import theme from "@/lib/theme";

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
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="dark">
          <Outlet />
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
