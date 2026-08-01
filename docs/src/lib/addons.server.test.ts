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
    { filename: "drizzle.md", name: "drizzle", description: "drizzle description" },
    { filename: "oxlint-oxfmt.md", name: "oxlint-oxfmt", description: "oxlint-oxfmt description" },
  ]);
});

test("getAddon returns the frontmatter alongside the raw content", async () => {
  expect(await getAddon("drizzle.md")).toEqual({
    filename: "drizzle.md",
    name: "drizzle",
    description: "drizzle description",
    content: mockAddon("drizzle.md"),
  });
});

test("getAddon rejects a filename that would escape the addons directory", async () => {
  expect(getAddon("../package.md")).rejects.toThrow('Invalid addon filename "../package.md"');
});

test("getAddon rejects a filename without the markdown extension", async () => {
  expect(getAddon("drizzle")).rejects.toThrow('Invalid addon filename "drizzle"');
});
