import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { fullPackageJsonSchema, packageJsonSchema } from "@/lib/templates.schemas";

const TEMPLATES_DIR = resolve("../templates");

async function readPackageJson(templateName: string) {
  const packageJsonPath = resolve(TEMPLATES_DIR, templateName, "package.json");
  const packageJsonContent = await readFile(packageJsonPath, "utf-8");
  return JSON.parse(packageJsonContent);
}

/**
 * Lists the available templates by reading the contents of the templates directory.
 */
export async function listTemplates() {
  const templateDirs = await readdir(TEMPLATES_DIR);
  return await Promise.all(
    templateDirs.map(async (dir) => {
      const rawPackageJson = await readPackageJson(dir);
      const packageJson = packageJsonSchema.parse(rawPackageJson);
      return packageJson;
    }),
  );
}

/**
 * Gets the full package.json for a given template name
 */
export async function getTemplatePackageJson(templateName: string) {
  const rawPackageJson = await readPackageJson(templateName);
  return fullPackageJsonSchema.parse(rawPackageJson);
}
