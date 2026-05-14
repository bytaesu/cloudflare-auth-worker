import { getMigrations } from "better-auth/db/migration";
import { Hono } from "hono";
import { auth } from "../lib/auth";
import { devOnlyMiddleware } from "../middleware/dev-only";

const app = new Hono();

app.use(devOnlyMiddleware);

app.get("/ok", (c) => c.json({ ok: true }));

app.post("/migrate", async (c) => {
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);

  if (toBeCreated.length === 0 && toBeAdded.length === 0) {
    return c.json({
      message: "No migrations needed",
    });
  }

  await runMigrations();

  return c.json({
    message: "Migrations completed successfully",
    created: toBeCreated.map((t) => t.table),
    added: toBeAdded.map((t) => t.table),
  });
});

export default app;
