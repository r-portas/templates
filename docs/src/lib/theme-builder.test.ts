import { describe, expect, test } from "bun:test";

import { DEFAULT_THEME } from "@mantine/core";

import { generateShades } from "@/lib/palette";
import {
  BRAND_COLOR,
  buildPreviewTheme,
  DEFAULT_THEME_CONFIG,
  formatThemeSnippet,
  type ThemeConfig,
} from "@/lib/theme-builder";

const CONFIG: ThemeConfig = {
  primary: { hue: 30, chroma: 0.14 },
  neutral: { hue: 90, chroma: 0.01 },
  primaryShade: 8,
  autoContrast: false,
};

describe("buildPreviewTheme", () => {
  test("registers the generated palettes as brand and gray", () => {
    const theme = buildPreviewTheme(CONFIG);
    expect(theme.colors?.[BRAND_COLOR]).toEqual(generateShades(CONFIG.primary));
    expect(theme.colors?.gray).toEqual(generateShades(CONFIG.neutral));
    expect(theme.primaryColor).toBe(BRAND_COLOR);
  });

  test("keeps Mantine's own palettes available", () => {
    // Components that hardcode a colour (Alert `color="red"`, for example) still need them.
    expect(buildPreviewTheme(CONFIG).colors?.red).toEqual(DEFAULT_THEME.colors.red);
  });

  test("carries primaryShade and autoContrast through", () => {
    const theme = buildPreviewTheme(CONFIG);
    expect(theme.primaryShade).toBe(8);
    expect(theme.autoContrast).toBe(false);
  });

  test("resets everything the docs theme would otherwise leak in", () => {
    // Guards the DEFAULT_THEME spread: without it the preview inherits this site's chrome.
    const theme = buildPreviewTheme(CONFIG);
    expect(theme.scale).toBe(DEFAULT_THEME.scale);
    expect(theme.fontFamily).toBe(DEFAULT_THEME.fontFamily);
    expect(theme.defaultRadius).toBe(DEFAULT_THEME.defaultRadius);
    expect(theme.radius).toEqual(DEFAULT_THEME.radius);
  });
});

describe("formatThemeSnippet", () => {
  test("emits every generated shade", () => {
    const snippet = formatThemeSnippet(CONFIG);
    for (const shade of [...generateShades(CONFIG.primary), ...generateShades(CONFIG.neutral)]) {
      expect(snippet).toContain(shade);
    }
  });

  test("marks the palettes as const so they satisfy MantineColorsTuple", () => {
    expect(formatThemeSnippet(CONFIG).match(/] as const;/g)).toHaveLength(2);
  });

  test("writes the scalar options into createTheme", () => {
    const snippet = formatThemeSnippet(CONFIG);
    expect(snippet).toContain(`primaryColor: "${BRAND_COLOR}"`);
    expect(snippet).toContain("primaryShade: 8");
    expect(snippet).toContain("autoContrast: false");
  });

  test("produces a snippet for the default config", () => {
    expect(formatThemeSnippet(DEFAULT_THEME_CONFIG)).toStartWith(
      'import { createTheme } from "@mantine/core";',
    );
  });
});
