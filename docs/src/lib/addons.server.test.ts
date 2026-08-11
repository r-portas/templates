import { expect, mock, test } from "bun:test";

function mockAddon(filename: string) {
  const name = filename.replace(".md", "");
  return [
    "---",
    `name: ${name}`,
    `description: ${name} description`,
    "---",
    "",
    `# ${name}`,
    "",
  ].join("\n");
}

const SERVABLE_FILENAMES = ["drizzle.md", "oxlint-oxfmt.md", "_template.md"];

mock.module("node:fs/promises", () => ({
  readdir: async () => ["drizzle.md", "oxlint-oxfmt.md", "_template.md", "README.txt"],
  readFile: async (path: string) => {
    const filename = path.split("/").pop();
    if (!filename || !SERVABLE_FILENAMES.includes(filename)) {
      throw new Error(`ENOENT: ${path}`);
    }
    return mockAddon(filename);
  },
}));

import { getAddon, listAddons } from "./addons.server";

test("listAddons returns the markdown addons without their content", async () => {
  expect(await listAddons()).toEqual([
    { slug: "drizzle", description: "drizzle description" },
    { slug: "oxlint-oxfmt", description: "oxlint-oxfmt description" },
  ]);
});

test("getAddon returns the frontmatter alongside the raw content", async () => {
  expect(await getAddon("drizzle")).toEqual({
    slug: "drizzle",
    description: "drizzle description",
    content: mockAddon("drizzle.md"),
    document: expect.any(Object),
  });
});

test("getAddon rejects a slug that would escape the addons directory", async () => {
  expect(getAddon("../package")).rejects.toThrow('Invalid addon filename "../package.md"');
});

test("getAddon resolves the authoring template even though it's excluded from listAddons", async () => {
  expect(await getAddon("_template")).toEqual({
    slug: "_template",
    description: "_template description",
    content: mockAddon("_template.md"),
    document: expect.any(Object),
  });
});
