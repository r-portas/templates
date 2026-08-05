import { Button, EmptyState } from "@mantine/core";
import { ArrowClockwiseIcon, MagnifyingGlassIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { createRouter, Link } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <EmptyState
      variant="light"
      icon={<MagnifyingGlassIcon />}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      m="lg"
    >
      <EmptyState.Actions>
        <Button component={Link} to="/">
          Go home
        </Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  // In production, don't leak internal details
  const message = import.meta.env.DEV ? error.message : "An unexpected error occurred";

  return (
    <EmptyState
      variant="light"
      color="red"
      icon={<WarningCircleIcon />}
      title="Something went wrong"
      description={message}
      m="lg"
    >
      <EmptyState.Actions>
        <Button onClick={reset} leftSection={<ArrowClockwiseIcon />}>
          Try again
        </Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}

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
