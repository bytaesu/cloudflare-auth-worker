import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { BETTER_AUTH_BASE_PATH } from "./lib/constants";
import authRoute from "./routes/auth";
import devRoute from "./routes/dev";

const app = new Hono();

/*
  Middlewares
*/
app.use(secureHeaders());
app.use(
  cors({
    origin: [
      // add allowed origins here
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Retry-After"],
    credentials: true,
    maxAge: 10 * 60,
  }),
);

/*
  Routes
*/
app.route("/__dev", devRoute);
app.route(BETTER_AUTH_BASE_PATH, authRoute);

export default app;
