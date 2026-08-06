import { createTheme } from "@mantine/core";

const SANS = "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono Variable', monospace";

export default createTheme({
  primaryColor: "gray",
  fontFamily: SANS,
  fontFamilyMonospace: MONO,
  scale: 0.9,
  components: {
    // Monochrome anchors match the body text, so the underline is all that marks a link.
    Anchor: { defaultProps: { underline: "always" } },
    // Mantine styles Badge for all-caps; its tracking reads too loose in mixed case.
    Badge: { defaultProps: { tt: "none", lts: "normal" } },
  },
});
