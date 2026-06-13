#!/bin/bash
# Reads PostToolUse hook input from stdin and formats the touched file with oxfmt.
INPUT=$(cat)
FILE_PATH=$(jq -r '.tool_input.file_path // empty' <<< "$INPUT")

[[ -z "$FILE_PATH" ]] && exit 0

"$CLAUDE_PROJECT_DIR/node_modules/.bin/oxfmt" "$FILE_PATH" >/dev/null 2>&1 || true
exit 0
