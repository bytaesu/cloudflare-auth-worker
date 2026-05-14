import { env } from "cloudflare:workers";

export const IS_DEV = env.ENVIRONMENT === "development";
export const IS_PROD = env.ENVIRONMENT === "production";

export const BETTER_AUTH_BASE_PATH = "/auth";
export const BETTER_AUTH_URL = env.BETTER_AUTH_URL;
export const BETTER_AUTH_SECRET = env.BETTER_AUTH_SECRET;
