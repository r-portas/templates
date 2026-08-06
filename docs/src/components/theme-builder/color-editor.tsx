import { ColorSwatch, Group, Slider, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { useRef, useState } from "react";

import { type ColorSeed, generateShades, hexToSeed, MAX_CHROMA } from "@/lib/palette";

import classes from "./color-editor.module.css";

/** Shade the hex field reads from and writes to — Mantine's conventional primary shade. */
const REFERENCE_SHADE = 6;

/** Tolerance for treating two seeds as the same colour, well below one hex step. */
const EPSILON = 1e-9;

function sameSeed(a: ColorSeed, b: ColorSeed) {
  return Math.abs(a.hue - b.hue) < EPSILON && Math.abs(a.chroma - b.chroma) < EPSILON;
}

/**
 * Hue and chroma controls for one theme colour, with a preview of the shades they produce.
 *
 * @param selectedShade - Highlights a shade in the strip and makes the swatches clickable.
 *
 * @remarks
 * Only hue and chroma are editable; lightness always comes from `LIGHTNESS_RAMP`. Pasting a
 * hex therefore adopts its hue and chroma but not its lightness.
 */
export function ColorEditor({
  label,
  seed,
  onChange,
  selectedShade,
  onSelectShade,
}: {
  label: string;
  seed: ColorSeed;
  onChange: (seed: ColorSeed) => void;
  selectedShade?: number;
  onSelectShade?: (shade: number) => void;
}) {
  const shades = generateShades(seed);
  const referenceHex = shades[REFERENCE_SHADE]!;

  // The hex field owns its text so a half-typed value isn't overwritten, but it has to
  // follow along when the sliders move. Tracking the seed the text represents lets us tell
  // the two apart without an effect.
  const [hexDraft, setHexDraft] = useState(referenceHex);
  const [hexError, setHexError] = useState(false);
  const draftSeed = useRef(seed);
  if (!sameSeed(draftSeed.current, seed)) {
    draftSeed.current = seed;
    setHexDraft(referenceHex);
    setHexError(false);
  }

  function handleHexChange(value: string) {
    setHexDraft(value);
    const parsed = hexToSeed(value);
    setHexError(!parsed);
    if (parsed) {
      draftSeed.current = parsed;
      onChange(parsed);
    }
  }

  return (
    <Stack gap="xs">
      <Group justify="space-between" align="center">
        <Text fw={500}>{label}</Text>
        <ColorSwatch color={referenceHex} size={20} withShadow={false} />
      </Group>

      <TextInput
        value={hexDraft}
        onChange={(event) => handleHexChange(event.currentTarget.value)}
        error={hexError}
        aria-label={`${label} hex value`}
        ff="monospace"
        spellCheck={false}
        autoComplete="off"
      />

      <Slider
        label={(value) => `${Math.round(value)}°`}
        aria-label={`${label} hue`}
        min={0}
        max={360}
        step={1}
        value={seed.hue}
        onChange={(hue) => onChange({ ...seed, hue })}
        className={classes.hue}
        thumbSize={16}
      />

      <Slider
        label={(value) => value.toFixed(3)}
        aria-label={`${label} chroma`}
        min={0}
        max={MAX_CHROMA}
        step={0.005}
        value={seed.chroma}
        onChange={(chroma) => onChange({ ...seed, chroma })}
        className={classes.chroma}
        // Paints the track as this hue running from grey to fully saturated.
        style={{ "--editor-hue": seed.hue } as React.CSSProperties}
        thumbSize={16}
      />

      <ShadeStrip shades={shades} selectedShade={selectedShade} onSelectShade={onSelectShade} />
    </Stack>
  );
}

function ShadeStrip({
  shades,
  selectedShade,
  onSelectShade,
}: {
  shades: readonly string[];
  selectedShade?: number;
  onSelectShade?: (shade: number) => void;
}) {
  return (
    <Group gap={2} wrap="nowrap" mt={4}>
      {shades.map((hex, index) => {
        const title = `Shade ${index} — ${hex}`;
        return (
          <Tooltip key={hex + String(index)} label={title} withArrow openDelay={300}>
            <button
              type="button"
              className={classes.shade}
              style={{ backgroundColor: hex }}
              data-selected={index === selectedShade || undefined}
              data-static={onSelectShade ? undefined : true}
              disabled={!onSelectShade}
              aria-label={title}
              aria-pressed={onSelectShade ? index === selectedShade : undefined}
              onClick={() => onSelectShade?.(index)}
            />
          </Tooltip>
        );
      })}
    </Group>
  );
}
