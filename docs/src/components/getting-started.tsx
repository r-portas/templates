import { Code, Text, Timeline } from "@mantine/core";

import { CopyCommand } from "@/components/copy-command";

/** Renders the step number inside a `Timeline.Item` bullet. */
function StepBullet({ number }: { number: number }) {
  return (
    <Text fz="xs" fw={500} ff="monospace">
      {number}
    </Text>
  );
}

export function GettingStarted() {
  return (
    <Timeline bulletSize={28} lineWidth={1}>
      <Timeline.Item bullet={<StepBullet number={1} />} title="Install bun">
        <Text size="sm" c="dimmed" mb="xs">
          The runtime and package manager every template uses.
        </Text>
        <CopyCommand command="curl -fsSL https://bun.sh/install | bash" size="sm" />
      </Timeline.Item>
      <Timeline.Item bullet={<StepBullet number={2} />} title="Pick a template">
        <Text size="sm" c="dimmed">
          Browse the templates below and click{" "}
          <Text span fw={500}>
            copy to clipboard
          </Text>{" "}
          on the one you want.
        </Text>
      </Timeline.Item>
      <Timeline.Item bullet={<StepBullet number={3} />} title="Scaffold and run">
        <Text size="sm" c="dimmed" mb="xs">
          Paste the command, then install and start the dev server. Replace <Code>my-project</Code>{" "}
          with your folder name, or use <Code>.</Code> to scaffold into the current directory.
        </Text>
        <CopyCommand command="cd my-project && bun install && bun dev" size="sm" />
      </Timeline.Item>
      <Timeline.Item bullet={<StepBullet number={4} />} title="(Optional) Configure addons">
        <Text size="sm" c="dimmed">
          Addons are optional setup steps that can be applied to a template by coding agents.
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}
