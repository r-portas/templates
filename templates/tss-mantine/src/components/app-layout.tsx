import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

export function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <AppShell header={{ height: 30 }}>
      <Navbar />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
