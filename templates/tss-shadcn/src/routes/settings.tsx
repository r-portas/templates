import { createFileRoute } from "@tanstack/react-router";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your preferences.</CardDescription>
      </CardHeader>
      <CardContent>Settings content goes here.</CardContent>
    </Card>
  );
}
