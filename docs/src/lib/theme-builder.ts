import { DEFAULT_THEME, type MantineColorShade, type MantineThemeOverride } from "@mantine/core";

import { type ColorSeed, generateShades } from "@/lib/palette";

/** Name the generated primary palette is registered under in the theme. */
export const BRAND_COLOR = "brand";

/** Everything the theme builder lets you change. */
export interface ThemeConfig {
  primary: ColorSeed;
  neutral: ColorSeed;
  /** Shade index used for filled surfaces, anchors and the focus ring. */
  primaryShade: MantineColorShade;
  autoContrast: boolean;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primary: { hue: 256, chroma: 0.15 },
  neutral: { hue: 256, chroma: 0.008 },
  primaryShade: 6,
  autoContrast: true,
};

/**
 * Narrows a slider or swatch index to the 0–9 union Mantine's `primaryShade` expects.
 *
 * @remarks
 * Mantine types shades as a literal union, but the controls that produce them (`Slider`,
 * swatch indexes) only know they are numbers, so the range is enforced here instead.
 */
export function toShade(value: number): MantineColorShade {
  const clamped = Math.min(9, Math.max(0, Math.round(value)));
  return clamped as MantineColorShade;
}

/**
 * Builds the theme used to render the live preview.
 *
 * @remarks
 * `DEFAULT_THEME` is spread in deliberately. `MantineProvider` renders its inner
 * `MantineThemeProvider` with `inherit` on, so a colours-only override nested inside the
 * docs site would pick up this site's fonts, radius scale and `scale: 0.85` — the preview
 * would then show the docs theme rather than a stock Mantine app.
 */
export function buildPreviewTheme(config: ThemeConfig): MantineThemeOverride {
  return {
    ...DEFAULT_THEME,
    colors: {
      ...DEFAULT_THEME.colors,
      [BRAND_COLOR]: generateShades(config.primary),
      gray: generateShades(config.neutral),
    },
    primaryColor: BRAND_COLOR,
    primaryShade: config.primaryShade,
    autoContrast: config.autoContrast,
  };
}

/**
 * Renders a config as a drop-in `src/lib/theme.ts` for a Mantine project.
 *
 * @remarks
 * The palettes are emitted as `as const` arrays because `MantineColorsTuple` is a readonly
 * ten-tuple — a plain array literal widens to `string[]` and fails to type check.
 */
export function formatThemeSnippet(config: ThemeConfig): string {
  return `import { createTheme } from "@mantine/core";

${formatPalette("BRAND", generateShades(config.primary))}

${formatPalette("NEUTRAL", generateShades(config.neutral))}

export default createTheme({
  colors: { ${BRAND_COLOR}: BRAND, gray: NEUTRAL },
  primaryColor: "${BRAND_COLOR}",
  primaryShade: ${config.primaryShade},
  autoContrast: ${config.autoContrast},
});
`;
}

function formatPalette(name: string, shades: readonly string[]): string {
  const entries = shades.map((shade, index) => `  "${shade}", // ${index}`).join("\n");
  return `const ${name} = [\n${entries}\n] as const;`;
}
