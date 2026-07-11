import { test, expect, mock } from "bun:test";

import type { PackageJson } from "./templates.schemas";

const mockPackageJson: PackageJson = {
  name: "mock-template",
  description: "A mock template for testing",
  dependencies: { react: "^19.0.0" },
  devDependencies: { typescript: "^5.0.0" },
};

mock.module("node:fs/promises", () => ({
  readdir: async () => ["react", "tss"],
  readFile: async (path: string) => {
    const name = path
      .split("/")
      .filter((part) => part !== "package.json")
      .pop();

    return JSON.stringify({
      ...mockPackageJson,
      name: name,
      description: `${name} description`,
    });
  },
}));

import { listTemplates, getTemplatePackageJson } from "./templates.server";

test("listTemplates returns the expected templates", async () => {
  const templates = await listTemplates();
  expect(templates).toEqual([
    { ...mockPackageJson, name: "react", description: "react description" },
    { ...mockPackageJson, name: "tss", description: "tss description" },
  ]);
});

test("getTemplatePackageJson returns the expected package.json", async () => {
  const packageJson = await getTemplatePackageJson("tss");
  expect(packageJson).toEqual({
    ...mockPackageJson,
    name: "tss",
    description: "tss description",
  });
});
