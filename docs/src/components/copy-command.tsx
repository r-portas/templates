import { ActionIcon, CopyButton, Group, Paper, Text, Tooltip } from "@mantine/core";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

export function CopyCommand({
  command,
  size = "md",
  prefix = "$",
  truncate = true,
}: {
  command: string;
  size?: "sm" | "md";
  prefix?: string;
  truncate?: boolean;
}) {
  return (
    <Paper withBorder p={size === "sm" ? "xs" : "sm"}>
      <Group gap="sm" wrap="nowrap">
        <Text span aria-hidden="true" size={size} c="dimmed" style={{ userSelect: "none" }}>
          {prefix}
        </Text>
        <Text
          span
          size={size}
          truncate={truncate ? "end" : undefined}
          style={{ flex: 1, minWidth: 0, overflowWrap: truncate ? undefined : "anywhere" }}
        >
          {command}
        </Text>
        <CopyButton value={command} timeout={1600}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
              <ActionIcon
                variant="subtle"
                size={size}
                color={copied ? "yellow" : "gray"}
                onClick={copy}
                aria-label={copied ? "Command copied" : `Copy command: ${command}`}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    </Paper>
  );
}
