import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight text-yellow-400">TSS TW app</h1>
      <button
        type="button"
        className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black transition-colors hover:bg-yellow-300"
      >
        Get started
      </button>
    </div>
  );
}
