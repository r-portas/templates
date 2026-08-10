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

mock.module("node:fs/promises", () => ({
  readdir: async () => ["drizzle.md", "oxlint-oxfmt.md", "README.txt"],
  readFile: async (path: string) => {
    const filename = path.split("/").pop();
    if (filename !== "drizzle.md" && filename !== "oxlint-oxfmt.md") {
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
