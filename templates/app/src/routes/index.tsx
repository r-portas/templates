import { clientEnv } from "@/lib/env";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h1 className="text-4xl">{clientEnv.VITE_APP_NAME}</h1>
    </div>
  );
}
