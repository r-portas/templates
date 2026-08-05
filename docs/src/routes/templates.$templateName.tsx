import {
  Anchor,
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { CopyCommand } from "@/components/copy-command";
import { GithubButton } from "@/components/github-button";
import { PageHeader } from "@/components/page-header";
import { githubUrl, gitpickCommand } from "@/lib/gitpick";
import { getTemplatePackageJsonFn } from "@/lib/templates.functions";

export const Route = createFileRoute("/templates/$templateName")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const template = await getTemplatePackageJsonFn({ data: params.templateName });
      return {
        template,
      };
    } catch {
      throw notFound();
    }
  },
});

function DependencyList({ dependencies }: { dependencies: Record<string, string> }) {
  const entries = Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        None
      </Text>
    );
  }
  return (
    <Table verticalSpacing={4} horizontalSpacing={0} withRowBorders={false} fz="sm">
      <Table.Tbody>
        {entries.map(([name, version]) => (
          <Table.Tr key={name}>
            <Table.Td>
              <Anchor
                href={`https://npmx.dev/package/${name}`}
                target="_blank"
                rel="noreferrer"
                c="var(--mantine-color-text)"
                underline="hover"
                fz="sm"
                ff="monospace"
              >
                {name}
              </Anchor>
            </Table.Td>
            <Table.Td ta="right" c="dimmed" ff="monospace" w={1} style={{ whiteSpace: "nowrap" }}>
              {version}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

function DependencyCard({
  title,
  dependencies,
}: {
  title: string;
  dependencies: Record<string, string>;
}) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Group justify="space-between" align="center" mb="md">
        <Text fw={600}>{title}</Text>
        <Badge variant="default" radius="sm">
          {Object.keys(dependencies).length}
        </Badge>
      </Group>
      <DependencyList dependencies={dependencies} />
    </Card>
  );
}

function RouteComponent() {
  const { template } = Route.useLoaderData();

  return (
    <Container size="md" py={64}>
      <Stack gap={40}>
        <PageHeader
          title={template.name}
          titleId={template.name}
          breadcrumb={{ label: "All templates", to: "/" }}
          action={<GithubButton href={githubUrl(template.name)} />}
        />
        <Text c="dimmed" maw={640}>
          {template.description}
        </Text>

        <CopyCommand command={gitpickCommand(template.name)} />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <DependencyCard title="Dependencies" dependencies={template.dependencies} />
          <DependencyCard title="Dev dependencies" dependencies={template.devDependencies} />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
