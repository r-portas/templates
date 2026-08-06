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
    <Card className={classes.card} withBorder pos="relative">
      {/* Covers the whole card so it's clickable; the copy button below stays clickable because it
          comes later in the DOM, not because of a stacking context */}
      <Link
        to="/templates/$templateName"
        params={{ templateName: name }}
        aria-label={`View ${name} template`}
        style={{ position: "absolute", inset: 0 }}
      />
      <Stack gap="md" justify="space-between">
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start" gap="md" wrap="nowrap">
            <Title
              order={4}
              style={{ pointerEvents: "none", viewTransitionName: `template-title-${name}` }}
            >
              {name}
            </Title>
            <PackageIcon color="var(--mantine-color-dimmed)" />
          </Group>
          <Text c="dimmed">{description}</Text>
        </Stack>
        <Stack gap="xs">
          <CopyCommand command={gitpickCommand(name)} size="sm" />
          <Group gap="xs">
            <Badge variant="default">{dependencyCount} Dependencies</Badge>
            <Badge variant="default">{devDependencyCount} Dev Dependencies</Badge>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}

export { TemplateCard };
