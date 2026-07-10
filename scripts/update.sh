#!/usr/bin/env bash
# Update every template's dependencies to the latest versions.
#
# Discovers each template under ./templates by its package.json and runs
# `bun update --latest` inside it, rewriting package.json and bun.lock.
set -euo pipefail

# Resolve the repo root regardless of where the script is invoked from.
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

for pkg in templates/*/package.json; do
  dir="$(dirname "$pkg")"
  echo "==> Updating $dir"
  (cd "$dir" && bun update --latest)
done

echo "==> Done"
