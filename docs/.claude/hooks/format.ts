#!/usr/bin/env bun

/**
 * Claude Code `PostToolUse` hook: formats files Claude writes with Oxfmt.
 *
 * Reads the hook payload from stdin and exits quietly when there is nothing to
 * format, so editing Markdown, JSON or CSS does not surface a hook error, and a
 * fresh clone without `node_modules` is not blocked on `bun install`.
 */

const FORMATTABLE = /\.[cm]?[jt]sx?$/;

type HookPayload = { tool_input?: { file_path?: string } };

const payload: HookPayload | null = await Bun.stdin.json().catch(() => null);
const filePath = payload?.tool_input?.file_path;

if (filePath && FORMATTABLE.test(filePath)) {
  const oxfmt = `${process.env.CLAUDE_PROJECT_DIR ?? "."}/node_modules/.bin/oxfmt`;

  if (await Bun.file(oxfmt).exists()) {
    Bun.spawnSync([oxfmt, filePath], { stdio: ["ignore", "ignore", "inherit"] });
  }
}
