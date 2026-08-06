import { describe, expect, test } from "bun:test";

import { DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

import appTheme from "@/lib/theme";
import {
  buildColorRamp,
  primaryShades,
  resolveColor,
  resolveThemeTokens,
} from "@/lib/theme-colors";

const theme = mergeMantineTheme(DEFAULT_THEME, appTheme);
const tokens = resolveThemeTokens(theme);

function token(name: string) {
  const match = tokens.find((candidate) => candidate.name === name);
  if (!match) {
    throw new Error(`Missing token: ${name}`);
  }
  return match;
}

describe("resolveColor", () => {
  test("resolves a variable that points straight at a ramp shade", () => {
    expect(
      resolveColor(
        "var(--mantine-color-dimmed)",
        { "--mantine-color-dimmed": "var(--mantine-color-gray-6)" },
        theme,
      ),
    ).toEqual({
      kind: "shade",
      ramp: "gray",
      shade: 6,
      label: "gray.6",
      hex: theme.colors.gray[6],
    });
  });

  test("follows a chain of variable references", () => {
    const lookup = {
      "--mantine-primary-color-filled": "var(--mantine-color-gray-filled)",
      "--mantine-color-gray-filled": "var(--mantine-color-gray-6)",
    };

    expect(resolveColor("var(--mantine-primary-color-filled)", lookup, theme)).toMatchObject({
      kind: "shade",
      label: "gray.6",
    });
  });

  test("returns a literal when the value is not a variable reference", () => {
    expect(resolveColor("#fff", {}, theme)).toEqual({ kind: "literal", value: "#fff" });
  });

  test("returns a literal when the variable is not in the lookup", () => {
    expect(resolveColor("var(--custom-color)", {}, theme)).toEqual({
      kind: "literal",
      value: "var(--custom-color)",
    });
  });

  test("does not treat an unknown ramp as a shade", () => {
    const lookup = { "--mantine-color-nope-3": "#123456" };

    expect(resolveColor("var(--mantine-color-nope-3)", lookup, theme)).toEqual({
      kind: "literal",
      value: "#123456",
    });
  });

  test("stops on a cyclic variable chain", () => {
    const lookup = {
      "--mantine-color-a": "var(--mantine-color-b)",
      "--mantine-color-b": "var(--mantine-color-a)",
    };

    expect(resolveColor("var(--mantine-color-a)", lookup, theme).kind).toBe("literal");
  });
});

describe("resolveThemeTokens", () => {
  test("resolves every token in both color schemes", () => {
    expect(tokens.length).toBeGreaterThan(0);
    for (const entry of tokens) {
      expect(entry.light).toBeDefined();
      expect(entry.dark).toBeDefined();
    }
  });

  test("leaves no token pointing at an unresolved variable", () => {
    const unresolved = tokens.filter(
      (entry) =>
        (entry.light.kind === "literal" && entry.light.value.startsWith("var(")) ||
        (entry.dark.kind === "literal" && entry.dark.value.startsWith("var(")),
    );

    expect(unresolved).toEqual([]);
  });

  test("maps dimmed text to the surface ramp of each scheme", () => {
    expect(token("--mantine-color-dimmed").light).toMatchObject({ label: "gray.6" });
    expect(token("--mantine-color-dimmed").dark).toMatchObject({ label: "dark.2" });
  });

  test("resolves the page background to a literal in light and a dark shade in dark", () => {
    expect(token("--mantine-color-body").light).toEqual({ kind: "literal", value: "#fff" });
    expect(token("--mantine-color-body").dark).toMatchObject({ label: "dark.7" });
  });

  test("resolves the primary tokens through to the primary ramp", () => {
    expect(token("--mantine-primary-color-filled").light).toMatchObject({
      ramp: theme.primaryColor,
    });
  });

  test("tracks the app theme's primary color rather than Mantine's default", () => {
    // The app sets primaryColor to gray, so anchors are monochrome instead of blue
    expect(token("--mantine-color-anchor").light).toMatchObject({ ramp: "gray" });
  });
});

describe("buildColorRamp", () => {
  const gray = buildColorRamp(theme, tokens, "gray");

  test("returns every shade of the ramp with its hex value", () => {
    expect(gray.shades).toHaveLength(theme.colors.gray.length);
    expect(gray.shades.map((shade) => shade.label)).toContain("gray.6");
    expect(gray.shades[6]?.hex).toBe(theme.colors.gray[6]);
  });

  test("annotates a shade with the tokens that point at it", () => {
    const names = gray.shades[6]?.usage.light.map((entry) => entry.name) ?? [];

    expect(names).toContain("--mantine-color-dimmed");
    expect(gray.shades[6]?.usage.dark).toEqual([]);
  });

  test("throws for a ramp that is not in the theme", () => {
    expect(() => buildColorRamp(theme, tokens, "burgundy")).toThrow("Unknown color ramp");
  });
});

describe("primaryShades", () => {
  test("splits Mantine's default per-scheme primary shade", () => {
    expect(primaryShades(theme)).toEqual({ light: 6, dark: 8 });
  });

  test("uses a single shade for both schemes", () => {
    expect(primaryShades({ ...theme, primaryShade: 4 })).toEqual({ light: 4, dark: 4 });
  });
});
