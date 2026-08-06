import { createTheme } from "@mantine/core";

const SANS = "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono Variable', monospace";

// Mantine reads `gray` at fixed indices for chrome (borders, muted text, disabled states) and
// reads `primaryColor` for filled/anchor surfaces, so this single palette serves both by placing
// each shadcn token at the index whose Mantine role it matches. Comments name the shadcn token
// each shade came from, then what Mantine uses it for.
// Shades 3 and 4 match because shadcn gives `--border` and `--input` the same value.
const NEUTRAL = [
  "#f5f5f5", // --accent             -> default hover
  "#f0f0f0", //                      -> light variant
  "#ebebeb", //                      -> light hover (subtle), disabled background
  "#e5e5e5", // --border             -> Paper, Card and Table borders
  "#e5e5e5", // --input              -> default border: Badge, Button, inputs
  "#a1a1a1", // --ring               -> placeholder
  "#737373", // --muted-foreground   -> dimmed text
  "#525252",
  "#262626", // --primary/90         -> filled hover
  "#171717", // --primary            -> filled, anchors, focus ring
] as const;

export default createTheme({
  white: "#ffffff",
  black: "#0a0a0a",
  colors: { gray: NEUTRAL },
  primaryColor: "gray",
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
