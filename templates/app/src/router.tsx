import { createRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { CircleAlertIcon, SearchXIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist or has been moved.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="/" className={buttonVariants()}>
          Go home
        </a>
      </EmptyContent>
    </Empty>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>{error.message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <button type="button" onClick={reset} className={buttonVariants()}>
          Try again
        </button>
      </EmptyContent>
    </Empty>
  );
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorComponent,
  });

  return router;
}
