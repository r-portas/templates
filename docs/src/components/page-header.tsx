import { Group, Stack, Title } from "@mantine/core";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AnchorLink } from "@/components/link";
import { LogoMark } from "@/components/logo-mark";

function BreadcrumbLink({ label, ...linkProps }: { label: string } & LinkProps) {
  return (
    <AnchorLink
      {...linkProps}
      c="dimmed"
      // `fit-content` so only the text is clickable, not the full width of the header column
      w="fit-content"
      style={{ display: "flex", alignItems: "center", gap: "var(--mantine-spacing-xs)" }}
    >
      <ArrowLeftIcon />
      {label}
    </AnchorLink>
  );
}

export function PageHeader({
  title,
  titleId,
  breadcrumb,
  action,
}: {
  title: string;
  titleId?: string;
  breadcrumb?: { label: string } & LinkProps;
  action?: ReactNode;
}) {
  return (
    <Group justify="space-between" align="flex-start" gap="md" wrap="nowrap">
      <Stack gap="xs">
        {breadcrumb && <BreadcrumbLink {...breadcrumb} />}
        <Group gap="sm" align="center" wrap="nowrap">
          <LogoMark style={{ viewTransitionName: "logo-mark" }} />
          <Title
            order={1}
            style={titleId ? { viewTransitionName: `template-title-${titleId}` } : undefined}
          >
            {title}
          </Title>
        </Group>
      </Stack>
      {action}
    </Group>
  );
}
