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
      size="sm"
      underline="hover"
      w="fit-content"
      style={{ display: "flex", alignItems: "center", gap: "var(--mantine-spacing-xs)" }}
    >
      <ArrowLeftIcon size={14} />
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
      <Group gap="sm" align="flex-start" wrap="nowrap">
        <LogoMark style={{ viewTransitionName: "logo-mark" }} />
        <Stack gap={4}>
          {breadcrumb && <BreadcrumbLink {...breadcrumb} />}
          <Title
            order={1}
            fz="h2"
            style={titleId ? { viewTransitionName: `template-title-${titleId}` } : undefined}
          >
            {title}
          </Title>
        </Stack>
      </Group>
      {action}
    </Group>
  );
}
