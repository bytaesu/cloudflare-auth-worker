import { Hono } from 'hono';
import { auth } from './lib/better-auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();

/**
 * Mounts Better Auth on all GET and POST requests under `/api/**`.
 * Ensure its `basePath` aligns with this route.
 */
app.on(['GET', 'POST'], '/api/**', (c) => {
  return auth(c.env).handler(c.req.raw);
});

export default app;
