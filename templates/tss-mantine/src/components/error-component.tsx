import { Button, EmptyState } from "@mantine/core";
import { ArrowClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
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
