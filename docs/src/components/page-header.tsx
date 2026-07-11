import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { LogoMark } from "@/components/logo-mark";

function BreadcrumbLink({ label, ...linkProps }: { label: string } & LinkProps) {
  return (
    <Link
      {...linkProps}
      className="flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-3.5" />
      {label}
    </Link>
  );
}

export function PageHeader({
  title,
  titleId,
  breadcrumb,
  action,
}: {
  title: string;
  titleId?: string;
  breadcrumb?: { label: string } & LinkProps;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3">
        <LogoMark style={{ viewTransitionName: "logo-mark" }} />
        <div className="flex flex-col gap-1">
          {breadcrumb && <BreadcrumbLink {...breadcrumb} />}
          <h1
            className="font-mono text-3xl font-semibold"
            style={titleId ? { viewTransitionName: `template-title-${titleId}` } : undefined}
          >
            {title}
          </h1>
        </div>
      </div>
      {action}
    </div>
  );
}
