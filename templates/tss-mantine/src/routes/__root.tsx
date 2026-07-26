import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";

import "@mantine/core/styles.css";
import theme from "@/lib/theme";

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
        title: "tss-mantine",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="dark">
          <AppLayout>
            <Outlet />
          </AppLayout>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
