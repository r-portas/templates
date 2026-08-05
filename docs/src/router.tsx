import { createRouter } from "@tanstack/react-router";

import { ErrorComponent } from "@/components/error-component";
import { NotFound } from "@/components/not-found";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultViewTransition: true,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorComponent,
  });

  return router;
}
