import { ThemeIcon, type ThemeIconProps } from "@mantine/core";
import { PackageIcon } from "@phosphor-icons/react";

export function LogoMark(props: ThemeIconProps) {
  return (
    <ThemeIcon size={36} radius="md" {...props}>
      <PackageIcon size={20} weight="duotone" />
    </ThemeIcon>
  );
}
