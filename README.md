# Cloudflare Auth Worker

A TypeScript-based lightweight authentication service, built with:

- [Hono](https://hono.dev)
- [Better Auth](https://better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres with Neon](https://neon.tech)

## Environment Variables

### .dev.vars

Used by Wrangler in local development

> In production, these should be set as Cloudflare Worker Secrets.

```.dev.vars
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
DATABASE_URL=
```

### .env

Used for local development and CLI tools such as:

- Drizzle ORM (drizzle-kit)
- Better Auth CLI

```env
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
DATABASE_URL=
```
