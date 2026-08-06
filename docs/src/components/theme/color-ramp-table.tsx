import { Group, Table, Text } from "@mantine/core";

import { Swatch, TokenUsage } from "@/components/theme/color-value";
import type { ColorRamp } from "@/lib/theme-colors";

/**
 * One row per shade of a ramp, annotated with the tokens that point at it in each colour scheme.
 *
 * @remarks
 * A ramp's hex values are the same in both schemes — only the tokens pointing at them change, so
 * a single set of swatches serves both columns.
 */
export function ColorRampTable({ ramp }: { ramp: ColorRamp }) {
  return (
    <Table.ScrollContainer minWidth={640} type="native">
      <Table verticalSpacing="xs" layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={200}>Shade</Table.Th>
            <Table.Th>Used for, light scheme</Table.Th>
            <Table.Th>Used for, dark scheme</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {ramp.shades.map((shade) => (
            <Table.Tr key={shade.label}>
              <Table.Td>
                <Group gap="xs" wrap="nowrap">
                  <Swatch color={shade.hex} size={22} />
                  <div>
                    <Text ff="monospace" size="sm">
                      {shade.label}
                    </Text>
                    <Text ff="monospace" size="xs" c="dimmed">
                      {shade.hex}
                    </Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td>
                <TokenUsage tokens={shade.usage.light} />
              </Table.Td>
              <Table.Td>
                <TokenUsage tokens={shade.usage.dark} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
