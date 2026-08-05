import { Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Stack component="section" gap="md">
      <Stack gap={4}>
        <Title order={2} fz="h4">
          {title}
        </Title>
        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
