import { ActionIcon, Code, CopyButton, Paper, ScrollArea, Tooltip } from "@mantine/core";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

import classes from "./code-block.module.css";

/**
 * A scrollable, copyable block of source code.
 *
 * @remarks
 * The single-line `CopyCommand` truncates and is meant for shell one-liners; this keeps
 * whitespace and line breaks intact instead.
 */
export function CodeBlock({ code, label = "code" }: { code: string; label?: string }) {
  return (
    <Paper bg="gray.0" pos="relative">
      <ScrollArea.Autosize mah={420} type="auto">
        <Code block bg="transparent" p="md" className={classes.code}>
          {code}
        </Code>
      </ScrollArea.Autosize>
      <CopyButton value={code} timeout={1600}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
            <ActionIcon
              variant="default"
              onClick={copy}
              className={classes.copy}
              aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Paper>
  );
}
