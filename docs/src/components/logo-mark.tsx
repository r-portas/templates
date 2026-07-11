import { PackageCheck } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function LogoMark({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      <PackageCheck className="size-5" />
    </div>
  );
}
