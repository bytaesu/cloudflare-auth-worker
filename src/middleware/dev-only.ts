import { createMiddleware } from "hono/factory";
import { IS_DEV } from "../lib/constants";

export const devOnlyMiddleware = createMiddleware(async (c, next) => {
  if (!IS_DEV) {
    return c.notFound();
  }

  await next();
});
