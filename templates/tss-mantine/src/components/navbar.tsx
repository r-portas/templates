import { AppShell, Button, Group, ThemeIcon, Title } from "@mantine/core";
import { AirTrafficControlIcon, HouseIcon, InfoIcon } from "@phosphor-icons/react";
import { Link, linkOptions, useMatchRoute } from "@tanstack/react-router";

import clientEnv from "@/lib/env";

const NAV_ITEMS = linkOptions([
  { to: "/", label: "Home", icon: HouseIcon },
  { to: "/about", label: "About", icon: InfoIcon },
]);

export function Navbar() {
  const matchRoute = useMatchRoute();

  return (
    <AppShell.Header>
      <Group h="100%" px="md" gap="xs">
        <Group gap="sm" mr="md">
          <ThemeIcon>
            <AirTrafficControlIcon />
          </ThemeIcon>
          <Title order={5}>{clientEnv.VITE_APP_NAME}</Title>
        </Group>
        {NAV_ITEMS.map(({ label, icon: Icon, ...linkOption }) => (
          <Button
            key={linkOption.to}
            component={Link}
            {...linkOption}
            variant={matchRoute({ to: linkOption.to }) === false ? "subtle" : "light"}
            leftSection={<Icon />}
            size="compact-sm"
          >
            {label}
          </Button>
        ))}
      </Group>
    </AppShell.Header>
  );
}
