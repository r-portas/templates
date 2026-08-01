import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { isValidAddonSlug, parseFrontmatter } from "@/lib/addons";
import { addonFrontmatterSchema } from "@/lib/addons.schemas";

const ADDONS_DIR = resolve("../addons");
const ADDON_EXTENSION = ".md";

/**
 * Lists the available addons by reading the contents of the addons directory.
 */
export async function listAddons() {
  const entries = await readdir(ADDONS_DIR);
  const slugs = entries
    .filter((entry) => entry.endsWith(ADDON_EXTENSION))
    .map((entry) => entry.slice(0, -ADDON_EXTENSION.length))
    .sort((a, b) => a.localeCompare(b));

  const addons = await Promise.all(slugs.map(async (slug) => getAddon(slug)));
  return addons.map(({ content: _content, ...addon }) => addon);
}

/**
 * Gets a single addon, including its raw markdown source.
 */
export async function getAddon(slug: string) {
  if (!isValidAddonSlug(slug)) {
    throw new Error(`Invalid addon slug "${slug}"`);
  }

  const content = await readFile(resolve(ADDONS_DIR, `${slug}${ADDON_EXTENSION}`), "utf-8");
  const frontmatter = addonFrontmatterSchema.parse(parseFrontmatter(content));

  return { ...frontmatter, slug, content };
}
