import { PackageCheck } from "lucide-react";

import { cn } from "@/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
        className,
      )}
    >
      <PackageCheck className="size-5" />
    </div>
  );
}

export { LogoMark };
