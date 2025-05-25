# Cloudflare Auth Worker

A TypeScript-based lightweight authentication service, built with:

- [Hono](https://hono.dev)
- [Better Auth](https://better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres with Neon](https://neon.tech)

## Environment Variables

This service uses three types of environment variable files for CLI tools, local development, and production deployment.

### .env

Used locally by CLI tools such as:

- Drizzle CLI
- Better Auth CLI

```dotenv
BETTER_AUTH_URL=http://localhost:8801
BETTER_AUTH_SECRET=h949f861d0e4caa6b89e91b4ce51c84292f1aec2aa1f4b86332a18b1af75a538
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```

### .dev.vars

Used by Wrangler in local development.

```bash
pnpm run dev  # Runs `wrangler dev`, loading variables from .dev.vars
```

```dotenv
BETTER_AUTH_URL=http://localhost:8801
BETTER_AUTH_SECRET=h949f861d0e4caa6b89e91b4ce51c84292f1aec2aa1f4b86332a18b1af75a538
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```

### .dev.vars.production

Used during deployment to register secrets on Cloudflare.

```bash
pnpm run deploy  # Runs `wrangler secret bulk .dev.vars.production && wrangler deploy --minify`
```

```dotenv
BETTER_AUTH_URL=<your-worker-url>
BETTER_AUTH_SECRET=h949f861d0e4caa6b89e91b4ce51c84292f1aec2aa1f4b86332a18b1af75a538
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```
