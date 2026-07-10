import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { z } from "zod";

import { getTemplatePackageJson, listTemplates } from "@/lib/templates.server";

export const listTemplatesFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(() => listTemplates());

export const getTemplatePackageJsonFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .validator(z.string())
  .handler(({ data: templateName }) => getTemplatePackageJson(templateName));
