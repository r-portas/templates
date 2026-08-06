import { Button, Divider, Group, Paper, Slider, Stack, Switch, Text, Title } from "@mantine/core";
import { ArrowCounterClockwiseIcon, CodeIcon } from "@phosphor-icons/react";

import type { ColorSeed } from "@/lib/palette";
import { type ThemeConfig, toShade } from "@/lib/theme-builder";

import { ColorEditor } from "./color-editor";

const SHADE_MARKS = [0, 3, 6, 9].map((value) => ({ value, label: String(value) }));

/**
 * The theme builder's sidebar: every knob that feeds `ThemeConfig`.
 *
 * @param onReset - Restores `DEFAULT_THEME_CONFIG`; the caller owns the config state.
 */
export function ThemeControls({
  config,
  onChange,
  onReset,
  onShowCode,
}: {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  onReset: () => void;
  onShowCode: () => void;
}) {
  function setSeed(key: "primary" | "neutral") {
    return (seed: ColorSeed) => onChange({ ...config, [key]: seed });
  }

  return (
    <Paper withBorder p="md">
      <Stack gap="md">
        <Stack gap={4}>
          <Title order={3}>Colours</Title>
          <Text size="xs" c="dimmed">
            Shades come from a fixed OKLCH lightness ramp, so a colour is just a hue and a chroma.
            Pasting a hex adopts those two and ignores its lightness.
          </Text>
        </Stack>

        <ColorEditor
          label="Primary"
          seed={config.primary}
          onChange={setSeed("primary")}
          selectedShade={config.primaryShade}
          onSelectShade={(shade) => onChange({ ...config, primaryShade: toShade(shade) })}
        />

        <Divider />

        <ColorEditor label="Neutral" seed={config.neutral} onChange={setSeed("neutral")} />

        <Divider />

        <Stack gap={4}>
          <Group justify="space-between">
            <Text fw={500}>Primary shade</Text>
            <Text size="sm" c="dimmed" ff="monospace">
              {config.primaryShade}
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            Which shade fills buttons, anchors and the focus ring.
          </Text>
          <Slider
            aria-label="Primary shade"
            min={0}
            max={9}
            step={1}
            marks={SHADE_MARKS}
            value={config.primaryShade}
            onChange={(shade) => onChange({ ...config, primaryShade: toShade(shade) })}
            mb="sm"
          />
        </Stack>

        <Switch
          label="Auto contrast"
          description="Flip label colour to stay readable on light fills."
          checked={config.autoContrast}
          onChange={(event) => onChange({ ...config, autoContrast: event.currentTarget.checked })}
        />

        <Divider />

        <Stack gap="xs">
          <Button leftSection={<CodeIcon />} onClick={onShowCode}>
            Get code
          </Button>
          <Button variant="default" leftSection={<ArrowCounterClockwiseIcon />} onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
