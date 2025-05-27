# Cloudflare Auth Worker

A TypeScript-based lightweight authentication service optimized for Cloudflare Workers, built with:

- [Hono](https://hono.dev)
- [Better Auth](https://better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres with Neon](https://neon.tech)

This setup offers the following benefits:

- Efficient development through integration of Cloudflare CLI, Better Auth CLI, and Drizzle CLI.
- Seamless transition between development and production environments.
- Apply changes consistently using a script.

You can extend this setup with custom scripts tailored to your workflow. That’s how I use it as well.

## Environment Variables

This service uses three types of environment variable files for CLI tools, local development, and production deployment.

### .env

Used locally by CLI tools such as:

- Drizzle CLI
- Better Auth CLI

```dotenv
BETTER_AUTH_URL=http://localhost:8801
BETTER_AUTH_SECRET=<YOUR_BETTER_AUTH_SECRET>
DATABASE_URL=<YOUR_DATABASE_URL>
```

### .dev.vars

Used by Wrangler in local development.

```bash
pnpm run dev  # Runs `wrangler dev`, loading variables from .dev.vars
```

```dotenv
BETTER_AUTH_URL=http://localhost:8801
BETTER_AUTH_SECRET=<YOUR_BETTER_AUTH_SECRET>
DATABASE_URL=<YOUR_DATABASE_URL>
```

### .dev.vars.production

Used during deployment to register secrets on Cloudflare.

```bash
pnpm run deploy  # Runs `wrangler secret bulk .dev.vars.production && wrangler deploy --minify`
```

```dotenv
BETTER_AUTH_URL=<YOUR_WORKER_URL>
BETTER_AUTH_SECRET=<YOUR_BETTER_AUTH_SECRET>
DATABASE_URL=<YOUR_DATABASE_URL>
```

## In closing

This project only provides a **starting point**, not a production-ready setup. For real-world use, you’ll need to configure things like CORS, rate limiting, plugins, etc. I’ve kept the setup minimal and simple, following official docs, so you can easily customize it to fit your needs.

The guide for this repository is available at:  
https://hono.dev/examples/better-auth-on-cloudflare
