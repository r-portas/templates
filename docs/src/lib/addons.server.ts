import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { parseMarkdown } from "@tanstack/markdown/parser";
import { YAML } from "bun";

import { isValidAddonFilename } from "@/lib/addons";
import { addonFrontmatterSchema } from "@/lib/addons.schemas";

const ADDONS_DIR = resolve("../addons");

/**
 * Lists the available addons by reading the contents of the addons directory.
 */
export async function listAddons() {
  const entries = await readdir(ADDONS_DIR);
  const filenames = entries.filter(isValidAddonFilename).toSorted((a, b) => a.localeCompare(b));

  const addons = await Promise.all(
    filenames.map((filename) => getAddon(filename.replace(".md", ""))),
  );
  // Don't include the raw/parsed content in the list, since it's not needed for the listing and can be large.
  return addons.map(({ content: _content, document: _document, ...addon }) => addon);
}

/**
 * Gets a single addon, including its raw markdown source.
 *
 * @param slug - The addon's slug, excluding the file extension, e.g. `docker`.
 */
export async function getAddon(slug: string) {
  const filename = `${slug}.md`;
  if (!isValidAddonFilename(filename)) {
    throw new Error(`Invalid addon filename "${filename}"`);
  }

  const content = await readFile(resolve(ADDONS_DIR, filename), "utf-8");
  const document = parseMarkdown(content, { frontmatter: true });
  const frontmatter = addonFrontmatterSchema.parse(YAML.parse(document.frontmatter ?? "") ?? {});

  return { slug, description: frontmatter.description, document, content };
}
