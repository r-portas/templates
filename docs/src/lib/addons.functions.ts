import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";

import { listAddons } from "@/lib/addons.server";

export const listAddonsFn = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(() => listAddons());
