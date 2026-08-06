import { createTheme } from "@mantine/core";

const SANS = "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono Variable', monospace";

// The primary palette: shadcn's neutral theme, which is Tailwind's `neutral` scale.
// Comments name the shadcn token each shade came from, then what Mantine uses it for.
const NEUTRAL = [
  "#fafafa", // --primary-foreground
  "#f5f5f5", // --secondary          -> light variant
  "#e5e5e5", // --border
  "#d4d4d4", // --chart-1
  "#a1a1a1", // --ring
  "#737373", // --muted-foreground
  "#525252", // --chart-3
  "#404040", // --chart-4
  "#262626", // --chart-5            -> filled hover
  "#171717", // --primary            -> filled, anchors
] as const;

// Mantine's chrome palette, read at fixed indices for borders, muted text and disabled states.
// Shades 3 and 4 match because shadcn gives `--border` and `--input` the same value.
const GRAY = [
  "#f5f5f5", // --accent             -> default hover
  "#f0f0f0",
  "#ebebeb",
  "#e5e5e5", // --border             -> Paper, Card and Table borders
  "#e5e5e5", // --input              -> default border: Badge, Button, inputs
  "#a1a1a1", // --ring               -> placeholder
  "#737373", // --muted-foreground   -> dimmed text
  "#525252",
  "#404040",
  "#262626",
] as const;

export default createTheme({
  white: "#ffffff",
  black: "#0a0a0a",
  colors: { neutral: NEUTRAL, gray: GRAY },
  primaryColor: "neutral",
  // At shade 9 Mantine steps `filled-hover` back to 8, matching shadcn's lighter `primary/90`.
  primaryShade: 9,
  autoContrast: true,
  fontFamily: SANS,
  fontFamilyMonospace: MONO,
  headings: { fontFamily: SANS },
  // Mirrors shadcn's `--radius` steps. Literal rem, so `scale` below does not shrink these.
  radius: { xs: "0.25rem", sm: "0.375rem", md: "0.5rem", lg: "0.625rem", xl: "0.875rem" },
  defaultRadius: "md",
  scale: 0.85,
  components: {
    // Monochrome anchors match the body text, so the underline is all that marks a link.
    Anchor: { defaultProps: { underline: "always" } },
    // Mantine styles Badge for all-caps; its tracking reads too loose in mixed case.
    Badge: { defaultProps: { tt: "none", lts: "normal" } },
  },
});
