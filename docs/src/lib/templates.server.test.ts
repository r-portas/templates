import { test, expect, mock } from "bun:test";

mock.module("node:fs/promises", () => ({
  readdir: async () => ["react", "tss"],
  readFile: async (path: string) => {
    const name = path
      .split("/")
      .filter((part) => part !== "package.json")
      .pop();

    return JSON.stringify({
      name: name,
      description: `${name} description`,
      dependencies: { react: "^19.0.0" },
      devDependencies: { typescript: "^5.0.0" },
    });
  },
}));

import { listTemplates, getTemplatePackageJson } from "./templates.server";

test("listTemplates returns the expected templates", async () => {
  const templates = await listTemplates();
  expect(templates).toEqual([
    { name: "react", description: "react description" },
    { name: "tss", description: "tss description" },
  ]);
});

test("getTemplatePackageJson returns the expected package.json", async () => {
  const packageJson = await getTemplatePackageJson("tss");
  expect(packageJson).toEqual({
    name: "tss",
    description: "tss description",
    dependencies: { react: "^19.0.0" },
    devDependencies: { typescript: "^5.0.0" },
  });
});
