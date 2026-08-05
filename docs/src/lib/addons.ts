/** Matches a leading `---` delimited frontmatter block. */
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

/** Addon filenames are resolved against the addons directory, so keep them to characters that are safe in a path segment, and require the markdown extension. */
const ADDON_FILENAME_PATTERN = /^[a-z0-9-]+\.md$/;

/**
 * Parses the leading frontmatter block of a markdown document into a flat record.
 *
 * Only supports the flat `key: value` scalars the addons use — nested structures, lists and
 * multiline values are not handled. Validate the result with `addonFrontmatterSchema`.
 */
export function parseFrontmatter(source: string): Record<string, string> {
  const block = source.match(FRONTMATTER_PATTERN)?.[1];
  if (!block) {
    return {};
  }

  const fields: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^(["'])(.*)\1$/, "$2");

    if (key) {
      fields[key] = value;
    }
  }

  return fields;
}

/**
 * Whether a filename is safe to resolve against the addons directory.
 *
 * @remarks Excludes filenames starting with `_` (e.g. `_template.md`), so authoring templates
 * placed alongside real addons aren't listed or served.
 */
export function isValidAddonFilename(filename: string) {
  return ADDON_FILENAME_PATTERN.test(filename);
}

/**
 * The site-relative path the raw markdown for an addon is served from.
 */
export function addonPath(filename: string) {
  return `/addons/${filename}`;
}
