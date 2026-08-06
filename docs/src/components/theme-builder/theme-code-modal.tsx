import { Modal, Stack, Text } from "@mantine/core";

import { CodeBlock } from "@/components/code-block";
import { formatThemeSnippet, type ThemeConfig } from "@/lib/theme-builder";

/** Shows the current config as a drop-in `src/lib/theme.ts`. */
export function ThemeCodeModal({
  config,
  opened,
  onClose,
}: {
  config: ThemeConfig;
  opened: boolean;
  onClose: () => void;
}) {
  return (
    <Modal opened={opened} onClose={onClose} title="Theme code" size="lg">
      <Stack gap="sm">
        <Text size="sm" c="dimmed">
          Save this as{" "}
          <Text span ff="monospace">
            src/lib/theme.ts
          </Text>{" "}
          and pass it to{" "}
          <Text span ff="monospace">
            MantineProvider
          </Text>
          .
        </Text>
        {/* Rendered on demand: the modal only mounts its body while open. */}
        <CodeBlock code={formatThemeSnippet(config)} label="theme code" />
      </Stack>
    </Modal>
  );
}
