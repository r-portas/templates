import { Code, Text, Timeline } from "@mantine/core";

import { CopyCommand } from "@/components/copy-command";

export function GettingStarted() {
  return (
    // `bulletSize` so the step numbers fit inside the bullets
    <Timeline bulletSize={28}>
      <Timeline.Item bullet={1} title="Install bun">
        <Text c="dimmed" mb="xs">
          The runtime and package manager every template uses.
        </Text>
        <CopyCommand command="curl -fsSL https://bun.sh/install | bash" size="sm" />
      </Timeline.Item>
      <Timeline.Item bullet={2} title="Pick a template">
        <Text c="dimmed">
          Browse the templates below and click copy to clipboard on the one you want.
        </Text>
      </Timeline.Item>
      <Timeline.Item bullet={3} title="Scaffold and run">
        <Text c="dimmed" mb="xs">
          Paste the command, then install and start the dev server. Replace <Code>my-project</Code>{" "}
          with your folder name, or use <Code>.</Code> to scaffold into the current directory.
        </Text>
        <CopyCommand command="cd my-project && bun install && bun dev" size="sm" />
      </Timeline.Item>
      <Timeline.Item bullet={4} title="(Optional) Configure addons">
        <Text c="dimmed">
          Addons are optional setup steps that can be applied to a template by coding agents.
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
