import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Group,
  Loader,
  Pagination,
  Progress,
  Radio,
  RingProgress,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { BellIcon, HeartIcon, InfoIcon, StarIcon } from "@phosphor-icons/react";

// `gradient` is left out on purpose: it reads from `theme.defaultGradient`, which this
// builder does not touch, so it would sit there in Mantine's stock blue.
const BUTTON_VARIANTS = ["filled", "light", "outline", "subtle", "default", "white"] as const;

/** Everything but `white`, which vanishes against the cards these are shown on. */
const SOLID_VARIANTS = BUTTON_VARIANTS.filter((variant) => variant !== "white");

const ROWS = [
  { plan: "Starter", seats: "3", status: "Active" },
  { plan: "Team", seats: "25", status: "Trialing" },
  { plan: "Enterprise", seats: "Unlimited", status: "Paused" },
];

/**
 * A cross-section of Mantine components, rendered with whatever theme wraps it.
 *
 * @remarks
 * Variant coverage is the point — a palette can look fine filled and fall apart in `light`
 * or `outline`, so every variant is shown side by side rather than a prettier subset.
 */
export function PreviewGallery() {
  return (
    <Stack gap="md">
      <PreviewCard title="Buttons">
        <Group>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Group>
        <Group>
          {SOLID_VARIANTS.map((variant) => (
            <ActionIcon key={variant} variant={variant} size="lg" aria-label={variant}>
              <HeartIcon />
            </ActionIcon>
          ))}
          <ThemeIcon size="lg">
            <StarIcon />
          </ThemeIcon>
          <ThemeIcon size="lg" variant="light">
            <StarIcon />
          </ThemeIcon>
          <Loader size="sm" />
        </Group>
      </PreviewCard>

      <PreviewCard title="Badges and chips">
        <Group>
          {SOLID_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </Group>
        <Group>
          <Chip defaultChecked>Checked</Chip>
          <Chip>Unchecked</Chip>
          <Chip variant="filled" defaultChecked>
            Filled
          </Chip>
          <Avatar name="Roy Portas" color="initials" />
        </Group>
      </PreviewCard>

      <PreviewCard title="Alerts">
        <Alert title="Deploy finished" icon={<InfoIcon />}>
          Your changes are live. <Anchor href="#preview">View the deployment</Anchor>.
        </Alert>
        <Alert title="Quota reached" color="red" variant="light" icon={<BellIcon />}>
          Mantine's own palettes stay available, so semantic colours keep working.
        </Alert>
      </PreviewCard>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <PreviewCard title="Inputs">
          <TextInput label="Project name" placeholder="my-project" defaultValue="my-project" />
          <Select
            label="Template"
            placeholder="Pick one"
            defaultValue="tss-mantine"
            data={["react", "tss", "tss-tw", "tss-mantine"]}
          />
          <Textarea label="Notes" placeholder="Anything worth remembering" rows={2} />
          <TextInput label="Disabled" defaultValue="Read only" disabled />
          <TextInput label="With error" defaultValue="oops" error="Something is wrong" />
        </PreviewCard>

        <PreviewCard title="Selection">
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Unchecked" />
          <Checkbox label="Indeterminate" indeterminate />
          <Radio.Group defaultValue="a" label="Radio group">
            <Group mt="xs">
              <Radio value="a" label="One" />
              <Radio value="b" label="Two" />
            </Group>
          </Radio.Group>
          <Switch label="Switch on" defaultChecked />
          <Switch label="Switch off" />
          <Slider defaultValue={60} mt="xs" />
        </PreviewCard>
      </SimpleGrid>

      <PreviewCard title="Progress">
        <Group align="center" gap="xl">
          <RingProgress
            size={90}
            sections={[{ value: 65, color: "var(--mantine-primary-color-filled)" }]}
            label={
              <Text ta="center" size="sm" fw={600}>
                65%
              </Text>
            }
          />
          <Stack gap="xs" flex={1}>
            <Progress value={72} />
            <Progress value={45} size="lg" striped animated />
            <Progress.Root size="xl">
              <Progress.Section value={40}>
                <Progress.Label>Used</Progress.Label>
              </Progress.Section>
              <Progress.Section value={20} color="gray.4">
                <Progress.Label>Reserved</Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </Stack>
        </Group>
      </PreviewCard>

      <PreviewCard title="Navigation and data">
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="usage">Usage</Tabs.Tab>
            <Tabs.Tab value="billing">Billing</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Plan</Table.Th>
              <Table.Th>Seats</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ROWS.map((row) => (
              <Table.Tr key={row.plan}>
                <Table.Td>{row.plan}</Table.Td>
                <Table.Td>{row.seats}</Table.Td>
                <Table.Td>
                  <Badge variant="light">{row.status}</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Pagination total={8} defaultValue={3} />
      </PreviewCard>
    </Stack>
  );
}

function PreviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Title order={4}>{title}</Title>
        {children}
      </Stack>
    </Card>
  );
}
