import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { PackageIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { CopyCommand } from "@/components/copy-command";
import { gitpickCommand } from "@/lib/gitpick";

import classes from "./template-card.module.css";

function TemplateCard({
  name,
  description,
  dependencyCount,
  devDependencyCount,
}: {
  name: string;
  description: string;
  dependencyCount: number;
  devDependencyCount: number;
}) {
  return (
    <Card className={classes.card} withBorder radius="md" padding="lg" pos="relative" h="100%">
      {/* Covers the whole card so it's clickable; the copy button sits above it via its own stacking context */}
      <Link
        to="/templates/$templateName"
        params={{ templateName: name }}
        aria-label={`View ${name} template`}
        style={{ position: "absolute", inset: 0 }}
      />
      <Stack gap="md" justify="space-between" h="100%">
        <Stack gap={4}>
          <Group justify="space-between" align="flex-start" gap="md" wrap="nowrap">
            <Text
              fw={600}
              ff="monospace"
              style={{ pointerEvents: "none", viewTransitionName: `template-title-${name}` }}
            >
              {name}
            </Text>
            <PackageIcon size={16} color="var(--mantine-color-dimmed)" />
          </Group>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>
        <Stack gap="xs" pos="relative">
          <CopyCommand command={gitpickCommand(name)} size="sm" />
          <Group gap="xs">
            <Badge variant="light" size="sm" radius="sm">
              {dependencyCount} dependencies
            </Badge>
            <Badge variant="default" size="sm" radius="sm">
              {devDependencyCount} dev dependencies
            </Badge>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}

export { TemplateCard };
