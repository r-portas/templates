import { AppShell, Group, Title } from "@mantine/core";
import { HouseIcon, InfoIcon } from "@phosphor-icons/react";
import { linkOptions, useMatchRoute } from "@tanstack/react-router";

import { ButtonLink } from "@/components/link";
import clientEnv from "@/lib/env";

const NAV_ITEMS = linkOptions([
  { to: "/", label: "Home", icon: HouseIcon },
  { to: "/about", label: "About", icon: InfoIcon },
]);

export function Navbar() {
  const matchRoute = useMatchRoute();

  return (
    <AppShell.Header>
      <Group px="sm" justify="space-between">
        <Title order={5}>{clientEnv.VITE_APP_NAME}</Title>
        <Group gap="xs">
          {NAV_ITEMS.map(({ label, icon: Icon, ...linkOption }) => (
            <ButtonLink
              key={linkOption.to}
              {...linkOption}
              variant={matchRoute({ to: linkOption.to }) === false ? "subtle" : "light"}
              leftSection={<Icon />}
              size="compact-sm"
            >
              {label}
            </ButtonLink>
          ))}
        </Group>
      </Group>
    </AppShell.Header>
  );
}
