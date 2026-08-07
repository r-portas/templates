import {
  Alert,
  Avatar,
  Badge,
  Blockquote,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Divider,
  Group,
  Indicator,
  Menu,
  Pagination,
  Progress,
  Radio,
  Select,
  Skeleton,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  CheckCircleIcon,
  DotsThreeVerticalIcon,
  InfoIcon,
  PencilIcon,
  TrashIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/kitchen-sink")({
  component: RouteComponent,
});

const INVOICES = [
  {
    id: "INV-1042",
    client: "Northwind Traders",
    status: "Paid",
    amount: "$1,240.00",
  },
  { id: "INV-1043", client: "Acme Corp", status: "Pending", amount: "$860.50" },
  { id: "INV-1044", client: "Globex", status: "Overdue", amount: "$2,310.00" },
  { id: "INV-1045", client: "Initech", status: "Paid", amount: "$430.00" },
] as const;

const STATUS_COLOR: Record<(typeof INVOICES)[number]["status"], string> = {
  Paid: "green",
  Pending: "yellow",
  Overdue: "red",
};

function Section({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <Stack gap="sm">
      <Title order={3}>{title}</Title>
      {children}
    </Stack>
  );
}

function RouteComponent() {
  return (
    <Container size="md" py="lg">
      <Stack gap="xl">
        <Stack gap={4}>
          <Title order={2}>Kitchen sink</Title>
          <Text c="dimmed">A tour of common components against the theme.</Text>
        </Stack>

        <Section title="Buttons">
          <Group>
            <Button>Filled</Button>
            <Button variant="light">Light</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="default">Default</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </Group>
          <Group>
            <Button color="green">Success</Button>
            <Button color="yellow">Warning</Button>
            <Button color="red">Danger</Button>
          </Group>
        </Section>

        <Section title="Badges">
          <Group>
            <Badge>Default</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dot">Dot</Badge>
            <Badge color="green">Paid</Badge>
            <Badge color="yellow">Pending</Badge>
            <Badge color="red">Overdue</Badge>
          </Group>
        </Section>

        <Section title="Cards">
          <Group align="stretch" grow>
            <Card withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="xs">
                <Text fw={600}>Storage used</Text>
                <ThemeIcon variant="light" radius="xl">
                  <CheckCircleIcon weight="fill" />
                </ThemeIcon>
              </Group>
              <Text size="xl" fw={700}>
                72.4 GB
              </Text>
              <Text size="sm" c="dimmed" mb="md">
                of 100 GB plan
              </Text>
              <Progress value={72} />
            </Card>

            <Card withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="xs">
                <Text fw={600}>Team member</Text>
                <Menu position="bottom-end" withArrow>
                  <Menu.Target>
                    <ThemeIcon
                      variant="subtle"
                      color="gray"
                      style={{ cursor: "pointer" }}
                    >
                      <DotsThreeVerticalIcon weight="bold" />
                    </ThemeIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<PencilIcon />}>Edit</Menu.Item>
                    <Menu.Item leftSection={<TrashIcon />} color="red">
                      Remove
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <Group>
                <Indicator
                  color="green"
                  position="bottom-end"
                  size={10}
                  withBorder
                  offset={4}
                >
                  <Avatar radius="xl" name="Ada Lovelace" color="primary" />
                </Indicator>
                <Stack gap={0}>
                  <Text fw={500}>Ada Lovelace</Text>
                  <Text size="sm" c="dimmed">
                    Online now
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Group>
        </Section>

        <Section title="Table">
          <Table.ScrollContainer minWidth={480}>
            <Table
              striped
              highlightOnHover
              verticalSpacing="sm"
              withTableBorder
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Invoice</Table.Th>
                  <Table.Th>Client</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th ta="right">Amount</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {INVOICES.map((invoice) => (
                  <Table.Tr key={invoice.id}>
                    <Table.Td>
                      <Code>{invoice.id}</Code>
                    </Table.Td>
                    <Table.Td>{invoice.client}</Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={STATUS_COLOR[invoice.status]}
                      >
                        {invoice.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td ta="right">{invoice.amount}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          <Pagination total={4} value={1} />
        </Section>

        <Section title="Alerts">
          <Stack gap="sm">
            <Alert
              variant="light"
              color="primary"
              icon={<InfoIcon weight="fill" />}
              title="Heads up"
            >
              This is an informational message using the primary color.
            </Alert>
            <Alert
              variant="light"
              color="green"
              icon={<CheckCircleIcon weight="fill" />}
              title="Success"
            >
              Your changes were saved.
            </Alert>
            <Alert
              variant="light"
              color="yellow"
              icon={<WarningIcon weight="fill" />}
              title="Warning"
            >
              This action can't easily be undone.
            </Alert>
            <Alert
              variant="light"
              color="red"
              icon={<XCircleIcon weight="fill" />}
              title="Error"
            >
              Something went wrong processing that request.
            </Alert>
          </Stack>
        </Section>

        <Section title="Form inputs">
          <Group align="flex-start" grow>
            <Stack gap="sm">
              <TextInput label="Name" placeholder="Ada Lovelace" />
              <Select
                label="Role"
                placeholder="Pick one"
                data={["Admin", "Editor", "Viewer"]}
                defaultValue="Editor"
              />
              <Textarea
                label="Notes"
                placeholder="Add a note…"
                autosize
                minRows={2}
              />
            </Stack>
            <Stack gap="sm">
              <Checkbox defaultChecked label="Email notifications" />
              <Switch defaultChecked label="Two-factor authentication" />
              <Radio.Group label="Plan" defaultValue="pro">
                <Group mt={4}>
                  <Radio value="free" label="Free" />
                  <Radio value="pro" label="Pro" />
                  <Radio value="team" label="Team" />
                </Group>
              </Radio.Group>
            </Stack>
          </Group>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="activity">Activity</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" pt="sm">
              <Text c="dimmed">Overview content goes here.</Text>
            </Tabs.Panel>
            <Tabs.Panel value="activity" pt="sm">
              <Text c="dimmed">Activity content goes here.</Text>
            </Tabs.Panel>
            <Tabs.Panel value="settings" pt="sm">
              <Text c="dimmed">Settings content goes here.</Text>
            </Tabs.Panel>
          </Tabs>
        </Section>

        <Section title="Misc">
          <Group>
            <Tooltip label="Muted / dimmed text">
              <Text c="dimmed">Hover me</Text>
            </Tooltip>
            <Divider orientation="vertical" />
            <Skeleton height={20} width={120} radius="sm" />
          </Group>
          <Blockquote color="primary" cite="– Ada Lovelace">
            That brain of mine is something more than merely mortal.
          </Blockquote>
        </Section>
      </Stack>
    </Container>
  );
}
