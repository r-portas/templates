import type { ReactNode } from "react";

import { CopyCommand } from "@/components/templates/copy-command";
import { cn } from "@/lib/utils";

function Step({
  number,
  title,
  children,
  isLast,
}: {
  number: number;
  title: string;
  children: ReactNode;
  isLast?: boolean;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-sm font-medium">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>
      <div className={cn("flex min-w-0 flex-1 flex-col gap-1 pt-0.5", !isLast && "pb-6")}>
        <h3 className="font-medium">{title}</h3>
        {children}
      </div>
    </li>
  );
}

export function GettingStarted() {
  return (
    <ol className="flex flex-col">
      <Step number={1} title="Install bun">
        <p className="text-sm text-muted-foreground">
          The runtime and package manager every template uses.
        </p>
        <CopyCommand command="curl -fsSL https://bun.sh/install | bash" size="sm" />
      </Step>
      <Step number={2} title="Pick a template">
        <p className="text-sm text-muted-foreground">
          Browse the templates below and click{" "}
          <span className="font-medium">copy to clipboard</span> on the one you want.
        </p>
      </Step>
      <Step number={3} title="Scaffold and run" isLast>
        <p className="text-sm text-muted-foreground">
          Paste the command, then install and start the dev server. Replace{" "}
          <code className="font-mono">my-project</code> with your folder name, or use{" "}
          <code className="font-mono">.</code> to scaffold into the current directory.
        </p>
        <CopyCommand command="cd my-project && bun install && bun dev" size="sm" />
      </Step>
    </ol>
  );
}
