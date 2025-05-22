import { Hono } from 'hono';
import { auth } from './lib/better-auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();

/**
 * Mounts the Better-Auth handler on all GET and POST requests.
 * This delegates all routing to Better-Auth.
 *
 * Docs: https://www.better-auth.com/docs/plugins/open-api
 */
app.on(['GET', 'POST'], '/**', (c) => {
  return auth(c.env).handler(c.req.raw);
});

export default app;
