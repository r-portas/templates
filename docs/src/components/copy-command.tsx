import { ActionIcon, CopyButton, Group, Paper, Text, Tooltip } from "@mantine/core";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

const SIZES = {
  md: { fz: "sm", px: "md", py: 6, action: "md" },
  sm: { fz: "xs", px: "sm", py: 4, action: "sm" },
} as const;

export function CopyCommand({
  command,
  size = "md",
  prefix = "$",
  truncate = true,
}: {
  command: string;
  size?: keyof typeof SIZES;
  prefix?: string;
  truncate?: boolean;
}) {
  const styles = SIZES[size];

  return (
    <Paper withBorder radius="md" px={styles.px} py={styles.py} bg="var(--mantine-color-default)">
      <Group gap="sm" wrap="nowrap" align="center">
        <Text
          span
          aria-hidden="true"
          c="dimmed"
          ff="monospace"
          fz={styles.fz}
          style={{ userSelect: "none" }}
        >
          {prefix}
        </Text>
        <Text
          span
          ff="monospace"
          fz={styles.fz}
          truncate={truncate ? "end" : undefined}
          style={{ flex: 1, minWidth: 0, wordBreak: truncate ? undefined : "break-all" }}
        >
          {command}
        </Text>
        <CopyButton value={command} timeout={1600}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
              <ActionIcon
                variant="subtle"
                color={copied ? "yellow" : "gray"}
                size={styles.action}
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
