import { Container, SimpleGrid, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { AddonCard } from "@/components/addons/addon-card";
import { GettingStarted } from "@/components/getting-started";
import { GithubButton } from "@/components/github-button";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { TemplateCard } from "@/components/templates/template-card";
import { listAddonsFn } from "@/lib/addons.functions";
import { GITPICK_REPO } from "@/lib/gitpick";
import { listTemplatesFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => ({
    templates: await listTemplatesFn(),
    addons: await listAddonsFn(),
  }),
});

function RouteComponent() {
  const { templates, addons } = Route.useLoaderData();
  return (
    <Container size="md" py={64}>
      <Stack gap={40}>
        <PageHeader
          title="Roy's Templates"
          action={<GithubButton href={`https://github.com/${GITPICK_REPO}`} />}
        />
        <Section title="Getting started" description="Three steps to your first project.">
          <GettingStarted />
        </Section>
        <Section
          title="Templates"
          description="Self-contained starters, ready to pull into a new project."
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {templates.map((template) => (
              <TemplateCard
                key={template.name}
                name={template.name}
                description={template.description}
                dependencyCount={Object.keys(template.dependencies).length}
                devDependencyCount={Object.keys(template.devDependencies).length}
              />
            ))}
          </SimpleGrid>
        </Section>
        <Section
          title="Addons"
          description="Optional setup steps to apply on top of a template. Copy the URL and point your coding agent at it."
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {addons.map((addon) => (
              <AddonCard
                key={addon.filename}
                filename={addon.filename}
                name={addon.name}
                description={addon.description}
              />
            ))}
          </SimpleGrid>
        </Section>
      </Stack>
    </Container>
  );
}
