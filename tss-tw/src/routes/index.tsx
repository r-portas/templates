import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold underline">TSS app</h1>
    </div>
  );
}
