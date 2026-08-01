import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_RESET_MS = 1600;

/**
 * Copies text to the clipboard and tracks a `copied` flag that resets itself shortly after.
 *
 * The reset timer is cleared on unmount so a card that disappears mid-timeout doesn't set state
 * on an unmounted component.
 */
export function useCopyToClipboard({ resetMs = DEFAULT_RESET_MS }: { resetMs?: number } = {}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return false;
      }

      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetMs);
      return true;
    },
    [resetMs],
  );

  return { copied, copy };
}
