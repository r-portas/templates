import type { MantineColorsTuple } from "@mantine/core";
import { clampChroma, converter, formatHex, parse } from "culori";

const toOklch = converter("oklch");

/**
 * Lightness stops used to expand a single colour into a Mantine shade tuple.
 *
 * @remarks
 * Index 0 is the lightest and index 9 the darkest, matching how Mantine orders shades.
 * The curve is steeper at the light end so the first few shades stay usable as tinted
 * backgrounds rather than collapsing into white.
 */
export const LIGHTNESS_RAMP = [0.97, 0.94, 0.89, 0.83, 0.76, 0.68, 0.6, 0.52, 0.44, 0.37] as const;

/**
 * The part of a colour a user actually edits.
 *
 * @remarks
 * Lightness is deliberately absent — {@link LIGHTNESS_RAMP} supplies it for every shade, so
 * a colour is fully described by where it sits on the hue wheel and how saturated it is.
 */
export interface ColorSeed {
  /** Hue angle in degrees, 0–360. */
  hue: number;
  /** OKLCH chroma. sRGB tops out around 0.37, and greys sit near 0. */
  chroma: number;
}

/** Largest chroma worth offering: beyond this every hue is clamped back into sRGB anyway. */
export const MAX_CHROMA = 0.37;

/**
 * Converts a seed plus a lightness into an sRGB hex string.
 *
 * @remarks
 * Chroma is clamped rather than clipped, so an out-of-gamut request loses saturation but
 * keeps its hue instead of skewing towards whichever channel overflowed first.
 */
export function seedToHex(seed: ColorSeed, lightness: number): string {
  return formatHex(
    clampChroma({ mode: "oklch", l: lightness, c: seed.chroma, h: seed.hue }, "oklch"),
  );
}

/**
 * Expands a seed into the ten shades Mantine expects for a theme colour.
 *
 * @example
 * ```ts
 * generateShades({ hue: 256, chroma: 0.15 });
 * // ⇒ ["#eef2ff", ..., "#2c3f8f"]
 * ```
 */
export function generateShades(seed: ColorSeed): MantineColorsTuple {
  return LIGHTNESS_RAMP.map((lightness) =>
    seedToHex(seed, lightness),
  ) as unknown as MantineColorsTuple;
}

/**
 * Reads a CSS colour string back into a seed, discarding its lightness.
 *
 * @returns The seed, or `undefined` when the string is not a colour culori understands.
 *
 * @remarks
 * Achromatic inputs such as `#ffffff` have no hue, so culori reports `h` as `undefined`.
 * Those fall back to hue 0, which is harmless because their chroma is 0 too.
 */
export function hexToSeed(value: string): ColorSeed | undefined {
  if (!parse(value)) {
    return undefined;
  }
  const color = toOklch(value);
  if (!color) {
    return undefined;
  }
  return { hue: color.h ?? 0, chroma: color.c };
}
