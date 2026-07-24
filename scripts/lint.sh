#!/usr/bin/env bash
# Lint every template's (and the docs site's) source code.
#
# Discovers each template under ./templates and the ./docs site by their
# package.json and runs `bun run lint` inside each.
set -euo pipefail

# Resolve the repo root regardless of where the script is invoked from.
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

for pkg in templates/*/package.json docs/package.json; do
  dir="$(dirname "$pkg")"
  echo "==> Linting $dir"
  (cd "$dir" && bun run lint)
done

echo "==> Done"
