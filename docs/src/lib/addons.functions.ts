import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { z } from "zod";

import { getAddon, listAddons } from "@/lib/addons.server";

export const listAddonsFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(() => listAddons());

export const getAddonFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .validator(z.string())
  .handler(({ data: slug }) => getAddon(slug));
