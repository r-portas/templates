import { Badge, ColorSwatch, Group, Text, Tooltip } from "@mantine/core";

import type { ResolvedColor, ThemeToken } from "@/lib/theme-colors";

import classes from "./color-value.module.css";

/** A colour swatch with a border, so shades near the page background stay visible. */
export function Swatch({ color, size = 18 }: { color: string; size?: number }) {
  return <ColorSwatch color={color} size={size} radius="sm" className={classes.swatch} />;
}

/**
 * A swatch plus the name of the colour it came from — `gray.6` for a ramp shade, or the literal
 * value (`#fff`) for tokens that do not point at a ramp.
 */
export function ColorValue({ color }: { color: ResolvedColor }) {
  const value = color.kind === "shade" ? color.hex : color.value;
  const label = color.kind === "shade" ? color.label : color.value;

  return (
    <Group gap="xs" wrap="nowrap">
      <Swatch color={value} />
      <Text ff="monospace" size="sm" style={{ whiteSpace: "nowrap" }}>
        {label}
      </Text>
    </Group>
  );
}

/**
 * The tokens that resolve to a given shade, as badges. Each badge names what the colour is used
 * for, with the CSS variable behind it in a tooltip.
 */
export function TokenUsage({ tokens }: { tokens: ThemeToken[] }) {
  if (tokens.length === 0) {
    return (
      <Text c="dimmed" size="sm">
        Unused
      </Text>
    );
  }

  return (
    <Group gap="xs">
      {tokens.map((token) => (
        <Tooltip key={token.name} label={token.name} withArrow>
          <Badge variant="default" className={classes.usage}>
            {token.description}
          </Badge>
        </Tooltip>
      ))}
    </Group>
  );
}
