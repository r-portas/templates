import { Card, Container, Group, Stack, Table, Text, useMantineTheme } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { GithubButton } from "@/components/github-button";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { ColorRampTable } from "@/components/theme/color-ramp-table";
import { Swatch } from "@/components/theme/color-value";
import { TokenTable } from "@/components/theme/token-table";
import { GITPICK_REPO } from "@/lib/gitpick";
import { buildColorRamp, primaryShades, resolveThemeTokens } from "@/lib/theme-colors";

export const Route = createFileRoute("/theme")({
  component: RouteComponent,
});

function PrimarySummary() {
  const theme = useMantineTheme();
  const shades = primaryShades(theme);
  const ramp = theme.colors[theme.primaryColor];

  const rows = [
    { label: "primaryColor", value: theme.primaryColor },
    { label: "primaryShade, light", value: shades.light },
    { label: "primaryShade, dark", value: shades.dark },
  ];

  return (
    <Card withBorder>
      <Table verticalSpacing="xs">
        <Table.Tbody>
          {rows.map((row) => (
            <Table.Tr key={row.label}>
              <Table.Td>
                <Text size="sm">{row.label}</Text>
              </Table.Td>
              <Table.Td>
                <Group justify="flex-end" gap="xs" wrap="nowrap">
                  {typeof row.value === "number" && ramp?.[row.value] && (
                    <Swatch color={ramp[row.value]} />
                  )}
                  <Text ff="monospace" size="sm">
                    {typeof row.value === "number"
                      ? `${theme.primaryColor}.${row.value}`
                      : row.value}
                  </Text>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

function RouteComponent() {
  // The theme from context is already merged with Mantine's defaults, which is what the resolver
  // expects — annotations then reflect this site's theme, not Mantine's stock one.
  const theme = useMantineTheme();
  const tokens = resolveThemeTokens(theme);

  return (
    <Container py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Theme colors"
          breadcrumb={{ label: "Home", to: "/" }}
          action={
            <Group gap="xs" wrap="nowrap">
              <ThemeToggle />
              <GithubButton href={`https://github.com/${GITPICK_REPO}`} />
            </Group>
          }
        />
        <Text c="dimmed">
          The ramps this site's Mantine theme draws from, and what each shade is used for. Ramp
          values are identical in both color schemes — only the tokens pointing at them change, so
          both schemes are annotated side by side. Every mapping is read back out of Mantine's own
          CSS variables resolver, so it always matches the installed version.
        </Text>

        <Section
          title="Gray"
          description="Surfaces, borders and muted text in the light scheme. Also the primary ramp."
        >
          <ColorRampTable ramp={buildColorRamp(theme, tokens, "gray")} />
        </Section>

        <Section title="Dark" description="Surfaces, borders and muted text in the dark scheme.">
          <ColorRampTable ramp={buildColorRamp(theme, tokens, "dark")} />
        </Section>

        <Section
          title="Primary"
          description="Primary is an alias, not a ramp of its own — it points at one of the ramps above."
        >
          <PrimarySummary />
        </Section>

        <Section
          title="Tokens"
          description="Every documented CSS variable and the color it resolves to in each scheme."
        >
          <TokenTable tokens={tokens} />
        </Section>
      </Stack>
    </Container>
  );
}
