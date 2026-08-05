import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
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
    <Card className={classes.card} withBorder pos="relative" h="100%">
      {/* Covers the whole card so it's clickable; the copy button sits above it via its own stacking context */}
      <Link
        to="/templates/$templateName"
        params={{ templateName: name }}
        aria-label={`View ${name} template`}
        style={{ position: "absolute", inset: 0 }}
      />
      <Stack gap="md" justify="space-between" h="100%">
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start" gap="md" wrap="nowrap">
            <Title
              order={3}
              style={{ pointerEvents: "none", viewTransitionName: `template-title-${name}` }}
            >
              {name}
            </Title>
            <PackageIcon />
          </Group>
          <Text c="dimmed">{description}</Text>
        </Stack>
        <Stack gap="xs" pos="relative">
          <CopyCommand command={gitpickCommand(name)} />
          <Group gap="xs">
            <Badge variant="light">{dependencyCount} dependencies</Badge>
            <Badge variant="default">{devDependencyCount} dev dependencies</Badge>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}

export { TemplateCard };
