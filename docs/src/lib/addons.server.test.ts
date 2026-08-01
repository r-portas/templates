import { expect, mock, test } from "bun:test";

function mockAddon(slug: string) {
  return [
    "---",
    `name: ${slug}`,
    `description: ${slug} description`,
    "---",
    "",
    `# ${slug}`,
    "",
  ].join("\n");
}

mock.module("node:fs/promises", () => ({
  readdir: async () => ["drizzle.md", "oxlint-oxfmt.md", "README.txt"],
  readFile: async (path: string) => {
    const slug = path.split("/").pop()?.replace(".md", "");
    if (slug !== "drizzle" && slug !== "oxlint-oxfmt") {
      throw new Error(`ENOENT: ${path}`);
    }
    return mockAddon(slug);
  },
}));

import { getAddon, listAddons } from "./addons.server";

test("listAddons returns the markdown addons without their content", async () => {
  expect(await listAddons()).toEqual([
    { slug: "drizzle", name: "drizzle", description: "drizzle description" },
    { slug: "oxlint-oxfmt", name: "oxlint-oxfmt", description: "oxlint-oxfmt description" },
  ]);
});

test("getAddon returns the frontmatter alongside the raw content", async () => {
  expect(await getAddon("drizzle")).toEqual({
    slug: "drizzle",
    name: "drizzle",
    description: "drizzle description",
    content: mockAddon("drizzle"),
  });
});

test("getAddon rejects a slug that would escape the addons directory", async () => {
  expect(getAddon("../package")).rejects.toThrow('Invalid addon slug "../package"');
});

test("getAddon rejects a slug that already carries the extension", async () => {
  expect(getAddon("drizzle.md")).rejects.toThrow('Invalid addon slug "drizzle.md"');
});
