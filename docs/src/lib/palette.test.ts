import { describe, expect, test } from "bun:test";

import { converter, displayable } from "culori";

import { generateShades, hexToSeed, LIGHTNESS_RAMP, MAX_CHROMA, seedToHex } from "@/lib/palette";

const toOklch = converter("oklch");

const HEX = /^#[0-9a-f]{6}$/;

const BLUE = { hue: 256, chroma: 0.15 };

describe("LIGHTNESS_RAMP", () => {
  test("has one stop per Mantine shade", () => {
    expect(LIGHTNESS_RAMP).toHaveLength(10);
  });

  test("runs from lightest to darkest", () => {
    expect(LIGHTNESS_RAMP.toSorted((a, b) => b - a)).toEqual([...LIGHTNESS_RAMP]);
  });
});

describe("generateShades", () => {
  test("returns ten hex strings", () => {
    const shades = generateShades(BLUE);
    expect(shades).toHaveLength(10);
    for (const shade of shades) {
      expect(shade).toMatch(HEX);
    }
  });

  test("gets darker as the index grows", () => {
    const lightness = generateShades(BLUE).map((shade) => toOklch(shade)!.l);
    expect(lightness.toSorted((a, b) => b - a)).toEqual(lightness);
  });

  test("clamps out-of-gamut chroma instead of clipping it", () => {
    // 0.4 exceeds what sRGB can hold at any lightness, so every shade needs desaturating.
    for (const shade of generateShades({ hue: 140, chroma: 0.4 })) {
      expect(displayable(shade)).toBe(true);
    }
  });

  test("produces greys when chroma is zero", () => {
    for (const shade of generateShades({ hue: 256, chroma: 0 })) {
      const [r, g, b] = [1, 3, 5].map((i) => shade.slice(i, i + 2));
      expect(r).toBe(g!);
      expect(g).toBe(b!);
    }
  });
});

describe("hexToSeed", () => {
  test("reads hue and chroma out of a hex string", () => {
    const seed = hexToSeed("#228be6")!;
    expect(seed.hue).toBeCloseTo(250.3, 1);
    expect(seed.chroma).toBeCloseTo(0.164, 3);
  });

  test("returns undefined for a string that is not a colour", () => {
    expect(hexToSeed("not-a-colour")).toBeUndefined();
    expect(hexToSeed("#22")).toBeUndefined();
  });

  test("falls back to hue 0 for achromatic colours", () => {
    expect(hexToSeed("#ffffff")).toEqual({ hue: 0, chroma: 0 });
  });

  test("round-trips a seed through seedToHex", () => {
    const seed = hexToSeed(seedToHex(BLUE, 0.6))!;
    expect(seed.hue).toBeCloseTo(BLUE.hue, 0);
    expect(seed.chroma).toBeCloseTo(BLUE.chroma, 2);
  });
});

describe("MAX_CHROMA", () => {
  test("stays inside sRGB across the hue wheel", () => {
    for (let hue = 0; hue < 360; hue += 15) {
      for (const shade of generateShades({ hue, chroma: MAX_CHROMA })) {
        expect(displayable(shade)).toBe(true);
      }
    }
  });
});
