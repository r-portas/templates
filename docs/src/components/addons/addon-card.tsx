import { Card, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { FileTextIcon } from "@phosphor-icons/react";
import { ClientOnly } from "@tanstack/react-router";

import { CopyCommand } from "@/components/copy-command";
import { ActionIconLink } from "@/components/link";
import { addonPath } from "@/lib/addons";

function getAddonUrl(filename: string) {
  return new URL(addonPath(filename), window.location.origin).toString();
}

function AddonCard({
  filename,
  name,
  description,
}: {
  filename: string;
  name: string;
  description: string;
}) {
  return (
    <Card withBorder h="100%">
      <Stack gap="md" justify="space-between" h="100%">
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start" gap="md" wrap="nowrap">
            <Title order={3}>{name}</Title>
            <Tooltip label="View raw markdown" withArrow>
              <ActionIconLink
                to="/addons/$filename"
                params={{ filename }}
                // `reloadDocument` because the target is a server route with no component
                reloadDocument
                variant="subtle"
                color="gray"
                aria-label={`View the raw markdown for the ${name} addon`}
              >
                <FileTextIcon />
              </ActionIconLink>
            </Tooltip>
          </Group>
          <Text c="dimmed">{description}</Text>
        </Stack>
        <ClientOnly>
          <AgentCommand filename={filename} />
        </ClientOnly>
      </Stack>
    </Card>
  );
}

function AgentCommand({ filename }: { filename: string }) {
  const url = getAddonUrl(filename);
  return (
    <CopyCommand
      command={`Follow the setup instructions at ${url}`}
      size="sm"
      truncate={false}
      prefix=">"
    />
  );
}

export { AddonCard };
