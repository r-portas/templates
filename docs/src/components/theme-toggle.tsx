import { ActionIcon, Box, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
      onClick={toggleColorScheme}
    >
      {/* Both icons are rendered and CSS hides one, keyed off the attribute ColorSchemeScript sets
          before paint. Picking the icon in JS instead mismatches on hydration, and React does not
          patch mismatched attributes, so the server's icon path would stick until the next render. */}
      <Box component={MoonIcon} darkHidden />
      <Box component={SunIcon} lightHidden />
    </ActionIcon>
  );
}
