import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { z } from "zod";

const TEMPLATES_DIR = resolve("../templates");

const packageJsonSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const fullPackageJsonSchema = packageJsonSchema.extend({
  dependencies: z.record(z.string(), z.string()),
  devDependencies: z.record(z.string(), z.string()),
});

async function readPackageJson(templateName: string) {
  const packageJsonPath = resolve(TEMPLATES_DIR, templateName, "package.json");
  const packageJsonContent = await readFile(packageJsonPath, "utf-8");
  return JSON.parse(packageJsonContent);
}

/**
 * Lists the available templates by reading the contents of the templates directory.
 *
 * TODO: Unit test
 */
export const listTemplatesFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    const templateDirs = await readdir(TEMPLATES_DIR);
    return await Promise.all(
      templateDirs.map(async (dir) => {
        const rawPackageJson = await readPackageJson(dir);
        const packageJson = packageJsonSchema.parse(rawPackageJson);
        return packageJson;
      }),
    );
  });

/**
 * Gets the full package.json for a given template name
 *
 * TODO: Unit test
 */
export const getTemplatePackageJsonFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .validator(z.string())
  .handler(async ({ data: templateName }) => {
    const rawPackageJson = await readPackageJson(templateName);
    const packageJson = fullPackageJsonSchema.parse(rawPackageJson);
    return packageJson;
  });
