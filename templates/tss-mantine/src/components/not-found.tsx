import { EmptyState } from "@mantine/core";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { ButtonLink } from "../link";

export function NotFound() {
  return (
    <EmptyState
      variant="light"
      icon={<MagnifyingGlassIcon />}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      m="lg"
    >
      <EmptyState.Actions>
        <ButtonLink to="/">Go home</ButtonLink>
      </EmptyState.Actions>
    </EmptyState>
  );
}
