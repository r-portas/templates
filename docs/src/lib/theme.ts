import { createTheme } from "@mantine/core";

const MONO = "'JetBrains Mono Variable', monospace";

export default createTheme({
  primaryColor: "yellow",
  fontFamily: MONO,
  fontFamilyMonospace: MONO,
  headings: { fontFamily: MONO },
});
