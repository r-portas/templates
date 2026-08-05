import { ThemeIcon, type ThemeIconProps } from "@mantine/core";
import { PackageIcon } from "@phosphor-icons/react";

export function LogoMark(props: ThemeIconProps) {
  return (
    <ThemeIcon {...props}>
      <PackageIcon />
    </ThemeIcon>
  );
}
