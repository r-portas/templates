import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { isValidAddonFilename, parseFrontmatter } from "@/lib/addons";
import { addonFrontmatterSchema } from "@/lib/addons.schemas";

const ADDONS_DIR = resolve("../addons");

/**
 * Lists the available addons by reading the contents of the addons directory.
 */
export async function listAddons() {
  const entries = await readdir(ADDONS_DIR);
  const filenames = entries.filter(isValidAddonFilename).sort((a, b) => a.localeCompare(b));

  const addons = await Promise.all(filenames.map((filename) => getAddon(filename)));
  return addons.map(({ content: _content, ...addon }) => addon);
}

/**
 * Gets a single addon, including its raw markdown source.
 */
export async function getAddon(filename: string) {
  if (!isValidAddonFilename(filename)) {
    throw new Error(`Invalid addon filename "${filename}"`);
  }

  const content = await readFile(resolve(ADDONS_DIR, filename), "utf-8");
  const frontmatter = addonFrontmatterSchema.parse(parseFrontmatter(content));

  return { ...frontmatter, filename, content };
}
