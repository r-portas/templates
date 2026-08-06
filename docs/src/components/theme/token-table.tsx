import { Table, Text } from "@mantine/core";

import { ColorValue } from "@/components/theme/color-value";
import type { ThemeToken } from "@/lib/theme-colors";

/**
 * The reverse lookup of {@link ColorRampTable} — every documented CSS variable, with the colour it
 * resolves to in each scheme. Rows are grouped by the token's `group`, in the order given.
 */
export function TokenTable({ tokens }: { tokens: ThemeToken[] }) {
  const groups = [...new Set(tokens.map((token) => token.group))];

  return (
    <Table.ScrollContainer minWidth={720} type="native">
      <Table verticalSpacing="xs" layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={280}>Variable</Table.Th>
            <Table.Th>Used for</Table.Th>
            <Table.Th w={140}>Light</Table.Th>
            <Table.Th w={140}>Dark</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {groups.map((group) => (
          <Table.Tbody key={group}>
            <Table.Tr>
              <Table.Th colSpan={4}>{group}</Table.Th>
            </Table.Tr>
            {tokens
              .filter((token) => token.group === group)
              .map((token) => (
                <Table.Tr key={token.name}>
                  <Table.Td>
                    <Text ff="monospace" size="sm" truncate="end">
                      {token.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{token.description}</Text>
                  </Table.Td>
                  <Table.Td>
                    <ColorValue color={token.light} />
                  </Table.Td>
                  <Table.Td>
                    <ColorValue color={token.dark} />
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        ))}
      </Table>
    </Table.ScrollContainer>
  );
}
