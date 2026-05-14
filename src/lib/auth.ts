import { betterAuth } from "better-auth";
import { env } from "cloudflare:workers";
import { BETTER_AUTH_BASE_PATH, BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "./constants";

export const auth = betterAuth({
  basePath: BETTER_AUTH_BASE_PATH,
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  database: env.D1,
  trustedOrigins: [
    // list of trusted origins here
  ],
  plugins: [
    // list of plugins here
  ],
  // ..and other options here
});
