#!/usr/bin/env bun
/**
 * Creates a new project from one of this repo's templates, replacing gitpick.
 *
 * Unlike gitpick, this stamps the exact commit the template was copied from into
 * `.claude/template-sync.json`, so the `sync-template` skill in the new project has an
 * accurate starting point instead of having to guess a creation date.
 *
 * Usage: bunx --bun github:r-portas/templates <template> <target-dir>
 */
import { $ } from "bun";
import { mkdtemp, mkdir, cp, rm, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO_URL = "https://github.com/r-portas/templates.git";
const REPO = "https://github.com/r-portas/templates";
const TEMPLATES = ["react", "tss", "tss-tw", "tss-shadcn"];

const [template, target] = process.argv.slice(2);

if (!template || !target || !TEMPLATES.includes(template)) {
  console.error(`Usage: bunx --bun github:r-portas/templates <template> <target-dir>`);
  console.error(`Templates: ${TEMPLATES.join(", ")}`);
  process.exit(1);
}

try {
  const entries = await readdir(target);
  if (entries.length > 0) {
    console.error(`"${target}" already exists and is not empty.`);
    process.exit(1);
  }
} catch {
  // Target doesn't exist yet, which is fine.
}

const scratch = await mkdtemp(join(tmpdir(), "create-template-"));

console.log(`Fetching the "${template}" template...`);
await $`git clone --quiet --depth 1 --filter=blob:none --sparse ${REPO_URL} ${scratch}`;
await $`git -C ${scratch} sparse-checkout set --no-cone templates/${template}`.quiet();
const baseCommit = (await $`git -C ${scratch} rev-parse HEAD`.text()).trim();

await mkdir(target, { recursive: true });
await cp(join(scratch, "templates", template), target, { recursive: true });
await rm(scratch, { recursive: true, force: true });

await mkdir(join(target, ".claude"), { recursive: true });
await writeFile(
  join(target, ".claude", "template-sync.json"),
  `${JSON.stringify({ template, repo: REPO, baseCommit }, null, 2)}\n`,
);

console.log(`Created "${target}" from the "${template}" template (base commit ${baseCommit.slice(0, 7)}).`);
