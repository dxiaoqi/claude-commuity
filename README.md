# Claude Community

Independent field notes and practical workflows for Claude and Claude Code.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Without `DATABASE_URL`, newsletter signups are written to `data/newsletter.jsonl` in development only. Production refuses signups unless PostgreSQL is configured.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Production

Copy `.env.production.example` to `.env` and generate independent secrets. Caddy terminates TLS and persists certificates in the `caddy-data` Docker volume. Do not commit `.env`.

Start the website, PostgreSQL, Umami, and Caddy together. Caddy automatically obtains and renews the TLS certificate:

```bash
npm run stack:up
```

Useful commands:

```bash
npm run stack:logs
npm run stack:down
```

After Umami starts, create the website in its dashboard and add the generated website ID to `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, then rebuild the app because public environment variables are embedded at build time.

### View analytics

Umami is bound to `127.0.0.1:3001` so its dashboard is not exposed publicly.

- Local: open `http://localhost:3001`
- ECS: run `ssh -L 3001:127.0.0.1:3001 user@your-ecs-ip`, then open `http://localhost:3001`

The dashboard shows visitors (UV), views (PV), referrers, landing pages, devices, countries, and custom conversion events.

## Analytics events

- `nav_click`
- `outbound_click`
- `newsletter_view`
- `newsletter_submit`
- `newsletter_success`
- `newsletter_error`

Newsletter attribution stores source, landing page, referrer, locale, UTM fields, consent time, and a salted IP hash.

## View newsletter subscribers

Development file storage:

```bash
npm run subscribers
```

Production PostgreSQL:

```bash
DATABASE_URL="postgresql://..." npm run subscribers
```

Production also includes a password-protected dashboard at:

```text
https://admin.claudecommunity.com/admin/subscribers
```

The dashboard supports email/source search, status and source filters, summary metrics, and UTF-8 CSV export. Access is protected by Caddy HTTP Basic Authentication. Generate a password hash with:

```bash
docker run --rm caddy:2-alpine caddy hash-password --plaintext 'your-password'
```

Store the result in `.env` as `ADMIN_PASSWORD_HASH`. If the bcrypt value contains `$`, wrap the value in single quotes so Docker Compose treats it literally.
