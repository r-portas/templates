import { defaultCssVariablesResolver, type MantineTheme } from "@mantine/core";

export type ColorSchemeName = "light" | "dark";

/** A theme colour that has been traced back to a ramp shade, or to a literal value. */
export type ResolvedColor =
  | { kind: "shade"; ramp: string; shade: number; label: string; hex: string }
  | { kind: "literal"; value: string };

export interface ThemeToken {
  /** CSS variable name, e.g. `--mantine-color-dimmed`. */
  name: string;
  /** What the token is used for, in plain language. */
  description: string;
  group: string;
  light: ResolvedColor;
  dark: ResolvedColor;
}

export interface RampShade {
  index: number;
  /** Mantine's shorthand for the shade, e.g. `gray.6`. */
  label: string;
  hex: string;
  usage: Record<ColorSchemeName, ThemeToken[]>;
}

export interface ColorRamp {
  name: string;
  shades: RampShade[];
}

/**
 * The semantic tokens worth documenting, in display order.
 *
 * @remarks
 * Only the descriptions are hand-written — which shade each token resolves to is read back out of
 * Mantine's own variables resolver, so it cannot drift from the installed version.
 */
const TOKENS: { name: string; description: string; group: string }[] = [
  { name: "--mantine-color-body", description: "Page background", group: "Text and background" },
  { name: "--mantine-color-text", description: "Body text", group: "Text and background" },
  {
    name: "--mantine-color-bright",
    description: "Maximum contrast text",
    group: "Text and background",
  },
  {
    name: "--mantine-color-dimmed",
    description: 'Muted text (c="dimmed")',
    group: "Text and background",
  },
  { name: "--mantine-color-anchor", description: "Link text", group: "Text and background" },
  {
    name: "--mantine-color-placeholder",
    description: "Input placeholder",
    group: "Text and background",
  },
  {
    name: "--mantine-color-default",
    description: "Surface background (Card, inputs, default Button)",
    group: "Surfaces",
  },
  { name: "--mantine-color-default-hover", description: "Surface, hovered", group: "Surfaces" },
  { name: "--mantine-color-default-color", description: "Text on a surface", group: "Surfaces" },
  {
    name: "--mantine-color-default-border",
    description: "Surface border (withBorder, Divider)",
    group: "Surfaces",
  },
  { name: "--mantine-color-disabled", description: "Disabled background", group: "States" },
  { name: "--mantine-color-disabled-color", description: "Disabled text", group: "States" },
  { name: "--mantine-color-disabled-border", description: "Disabled border", group: "States" },
  { name: "--mantine-color-error", description: "Error text and borders", group: "States" },
  { name: "--mantine-color-success", description: "Success text", group: "States" },
  {
    name: "--mantine-primary-color-filled",
    description: "Filled Button / Badge background",
    group: "Primary",
  },
  {
    name: "--mantine-primary-color-filled-hover",
    description: "Filled, hovered",
    group: "Primary",
  },
  {
    name: "--mantine-primary-color-contrast",
    description: "Text on a filled primary surface",
    group: "Primary",
  },
  {
    name: "--mantine-primary-color-light",
    description: "Light variant background",
    group: "Primary",
  },
  {
    name: "--mantine-primary-color-light-hover",
    description: "Light variant, hovered",
    group: "Primary",
  },
  {
    name: "--mantine-primary-color-light-color",
    description: "Light variant text and icons",
    group: "Primary",
  },
];

const SHADE_VARIABLE = /^--mantine-color-([a-z]+)-(\d)$/;
const VARIABLE_REFERENCE = /^var\(\s*(--[\w-]+)\s*\)$/;

/**
 * Follows a `var(--mantine-*)` chain until it lands on a ramp shade or a literal value.
 *
 * @param value - A CSS value, typically `var(--mantine-color-dimmed)`
 * @param lookup - Variable name to value, for a single colour scheme
 * @param theme - Used to confirm a ramp exists and to read its hex values
 *
 * @remarks
 * Tokens can indirect more than once — `--mantine-primary-color-filled` points at
 * `--mantine-color-gray-filled`, which points at `--mantine-color-gray-6`.
 *
 * @example
 * ```ts
 * resolveColor("var(--mantine-color-dimmed)", lookup, theme);
 * // { kind: "shade", ramp: "gray", shade: 6, label: "gray.6", hex: "#868e96" }
 * ```
 */
export function resolveColor(
  value: string,
  lookup: Record<string, string>,
  theme: MantineTheme,
  seen: Set<string> = new Set(),
): ResolvedColor {
  const trimmed = value.trim();
  const reference = VARIABLE_REFERENCE.exec(trimmed);
  if (!reference?.[1]) {
    return { kind: "literal", value: trimmed };
  }
  const name = reference[1];

  // Stop at a shade variable rather than resolving it, so the ramp and index survive
  const shadeMatch = SHADE_VARIABLE.exec(name);
  if (shadeMatch?.[1] && shadeMatch[2]) {
    const ramp = shadeMatch[1];
    const shade = Number(shadeMatch[2]);
    const hex = theme.colors[ramp]?.[shade];
    if (hex) {
      return { kind: "shade", ramp, shade, label: `${ramp}.${shade}`, hex };
    }
  }

  // A variable that points back at itself would otherwise recurse forever
  if (seen.has(name)) {
    return { kind: "literal", value: trimmed };
  }
  seen.add(name);

  const next = lookup[name];
  return next === undefined
    ? { kind: "literal", value: trimmed }
    : resolveColor(next, lookup, theme, seen);
}

/**
 * Resolves every documented token to its light and dark scheme value.
 *
 * @param theme - The merged theme, as returned by `useMantineTheme()`
 */
export function resolveThemeTokens(theme: MantineTheme): ThemeToken[] {
  const { variables, light, dark } = defaultCssVariablesResolver(theme);
  const lightLookup = { ...variables, ...light };
  const darkLookup = { ...variables, ...dark };

  return TOKENS.map(({ name, description, group }) => ({
    name,
    description,
    group,
    light: resolveColor(`var(${name})`, lightLookup, theme),
    dark: resolveColor(`var(${name})`, darkLookup, theme),
  }));
}

function usesShade(color: ResolvedColor, ramp: string, shade: number) {
  return color.kind === "shade" && color.ramp === ramp && color.shade === shade;
}

/**
 * Builds a ramp's ten shades, each annotated with the tokens that point at it.
 *
 * @param theme - The merged theme, as returned by `useMantineTheme()`
 * @param tokens - Output of {@link resolveThemeTokens}
 * @param name - A key of `theme.colors`, e.g. `"gray"`
 *
 * @remarks
 * Ramp values are the same in both colour schemes; only the tokens pointing at them change.
 */
export function buildColorRamp(theme: MantineTheme, tokens: ThemeToken[], name: string): ColorRamp {
  const shades = theme.colors[name];
  if (!shades) {
    throw new Error(`Unknown color ramp: ${name}`);
  }

  return {
    name,
    shades: shades.map((hex, index) => ({
      index,
      label: `${name}.${index}`,
      hex,
      usage: {
        light: tokens.filter((token) => usesShade(token.light, name, index)),
        dark: tokens.filter((token) => usesShade(token.dark, name, index)),
      },
    })),
  };
}

/**
 * Normalises `theme.primaryShade`, which is either a single shade or one per colour scheme.
 */
export function primaryShades(theme: MantineTheme): Record<ColorSchemeName, number> {
  const { primaryShade } = theme;
  return typeof primaryShade === "number"
    ? { light: primaryShade, dark: primaryShade }
    : { light: primaryShade.light ?? 6, dark: primaryShade.dark ?? 8 };
}
