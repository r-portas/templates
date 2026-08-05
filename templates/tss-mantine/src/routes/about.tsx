import { Container, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <Title order={2} mb="sm">
        About
      </Title>
      <Text c="dimmed">About this app.</Text>
    </Container>
  );
}
