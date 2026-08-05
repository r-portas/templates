import { Button } from "@mantine/core";
import { GitBranchIcon } from "@phosphor-icons/react";

export function GithubButton({ href }: { href: string }) {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      variant="subtle"
      color="gray"
      size="compact-sm"
      leftSection={<GitBranchIcon />}
    >
      GitHub
    </Button>
  );
}
