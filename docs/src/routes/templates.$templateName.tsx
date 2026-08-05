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
  Title,
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
    return <Text c="dimmed">None</Text>;
  }
  return (
    <Table>
      <Table.Tbody>
        {entries.map(([name, version]) => (
          <Table.Tr key={name}>
            <Table.Td maw={0} w="100%">
              <Anchor
                href={`https://npmx.dev/package/${name}`}
                target="_blank"
                rel="noreferrer"
                truncate="end"
                display="block"
              >
                {name}
              </Anchor>
            </Table.Td>
            <Table.Td ta="right" c="dimmed" w={1} style={{ whiteSpace: "nowrap" }}>
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
    <Card withBorder>
      <Group justify="space-between" mb="md">
        <Title order={3}>{title}</Title>
        <Badge variant="default">{Object.keys(dependencies).length}</Badge>
      </Group>
      <DependencyList dependencies={dependencies} />
    </Card>
  );
}

function RouteComponent() {
  const { template } = Route.useLoaderData();

  return (
    <Container py="xl">
      <Stack gap="xl">
        <PageHeader
          title={template.name}
          titleId={template.name}
          breadcrumb={{ label: "All templates", to: "/" }}
          action={<GithubButton href={githubUrl(template.name)} />}
        />
        <Text c="dimmed">{template.description}</Text>

        <CopyCommand command={gitpickCommand(template.name)} />

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <DependencyCard title="Dependencies" dependencies={template.dependencies} />
          <DependencyCard title="Dev dependencies" dependencies={template.devDependencies} />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
