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
      leftSection={<GitBranchIcon />}
    >
      GitHub
    </Button>
  );
}
