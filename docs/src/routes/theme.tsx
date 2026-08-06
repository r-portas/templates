import { Container, Grid, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/page-header";
import { ThemeCodeModal } from "@/components/theme-builder/theme-code-modal";
import { ThemeControls } from "@/components/theme-builder/theme-controls";
import { ThemePreview } from "@/components/theme-builder/theme-preview";
import { DEFAULT_THEME_CONFIG, type ThemeConfig } from "@/lib/theme-builder";

import classes from "./theme.module.css";

export const Route = createFileRoute("/theme")({
  component: RouteComponent,
});

function RouteComponent() {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [codeOpened, code] = useDisclosure(false);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <PageHeader title="Theme builder" breadcrumb={{ label: "All templates", to: "/" }} />
          <Text c="dimmed">
            Pick a primary and a neutral colour, then copy the Mantine theme they produce.
          </Text>
        </Stack>

        {/* Columns stretch (the default) so the sticky sidebar has the preview's height to
            travel within — with `align="flex-start"` it would scroll away instead. */}
        <Grid gap="xl">
          <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
            <div className={classes.sidebar}>
              <ThemeControls
                config={config}
                onChange={setConfig}
                onReset={() => setConfig(DEFAULT_THEME_CONFIG)}
                onShowCode={code.open}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
            <ThemePreview config={config} />
          </Grid.Col>
        </Grid>
      </Stack>

      <ThemeCodeModal config={config} opened={codeOpened} onClose={code.close} />
    </Container>
  );
}
