import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"

function CopyCommand({
  command,
  className,
  size = "default",
}: {
  command: string
  className?: string
  size?: "default" | "sm"
}) {
  const [copied, setCopied] = useState(false)

  function legacyCopy(text: string) {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      legacyCopy(command)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-slot="copy-command"
      aria-label={copied ? "Command copied" : `Copy command: ${command}`}
      className={cn(
        "group/copy relative flex w-full items-center gap-3 border border-line bg-panel text-left font-mono transition-colors",
        "hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "default" ? "rounded-md px-4 py-3 text-[0.8rem] sm:text-sm" : "rounded px-3 py-2 text-xs",
        className,
      )}
    >
      <span aria-hidden="true" className="shrink-0 text-accent select-none">
        $
      </span>
      <span className="min-w-0 flex-1 truncate text-ink/90">{command}</span>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1.5 text-[0.65rem] tracking-wide uppercase",
          copied ? "text-accent" : "text-ink/40 group-hover/copy:text-accent",
        )}
      >
        {copied ? (
          <>
            <Check className="size-3.5" />
            copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            copy
          </>
        )}
      </span>
    </button>
  )
}

export { CopyCommand }
