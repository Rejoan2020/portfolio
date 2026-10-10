# Rejoan Portfolio

Personal portfolio of Md. Rejoanur Rahman Apu, built with the Next.js App Router, React 19 and TypeScript.

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

The site runs without any environment variables. Only the shared click counter needs Redis and Blob credentials; without them it shows a "shared count unavailable" note and still counts the visitor's own clicks.

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server                            |
| `npm run build`     | Production build                              |
| `npm run check`     | Lint, type-check and unit tests (run before pushing) |
| `npm test`          | Unit tests (Vitest)                           |

## Project structure

```
app/
  layout.tsx              Root <html>: font, theme from cookies, global CSS
  (site)/                 Home and About, framed by the shared header/footer
  (projects)/             /projects and /projects/[slug], with the projects page frame
  api/clicks/             Shared click counter (GET total, POST increment)
  api/counter-backup/     Daily snapshot of the total, called by Vercel Cron
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found.tsx
components/               Header, footer, theme controls, counter, cards, icons
content/
  profile.ts              Experience, education, competitions, skills
  projects/               One file per project; index.ts lists them
lib/
  counter/                Counter logic (core.ts, unit tested), Redis store, Blob backups
  theme.ts                Theme flavors, accents and cookie parsing
  site.ts                 Name, links and site URL
assets/images/            Optimized images, imported so next/image knows their size
proxy.ts                  Per-request nonce and Content-Security-Policy
```

### Editing content

- **Add a project:** create `content/projects/<slug>.tsx` that exports a `Project`, then add it to the list in `content/projects/index.ts`. A project with a `card` appears in the listings; one without a card is reachable only by its URL.
- **Experience, education and skills** are plain data in `content/profile.ts`.
- **Images** go in `assets/images/` at about twice their displayed width. `next/image` serves AVIF or WebP at the right size. Full-resolution originals can be kept in `assets/originals/`, which is gitignored.

## How it works

**Rendering and security.** `proxy.ts` creates a fresh nonce for every request and sends a strict CSP: only scripts carrying the nonce may run. Because of this, pages render per request. In return there is no `'unsafe-inline'` for scripts, and the server can read the theme cookie, so pages arrive already in the visitor's theme with no flash. Other security headers (HSTS, `nosniff`, frame denial, permissions policy) are set in `next.config.ts`.

**Themes.** The Catppuccin flavors are defined in CSS, selected by `data-flavor` on `<html>`. A custom accent is the `--accent` property. Choices are saved in cookies. On the server, cookie values are checked against allow-lists before being rendered.

**Click counter.** The total lives in Upstash Redis.
- Increments are atomic. A Lua script increments only if the key exists, so a flushed database never silently restarts from 1.
- If the key is missing, the next request restores it from the latest Vercel Blob snapshot. Snapshots are written daily at 00:00 UTC by the cron job in `vercel.json`.
- POSTs must be same-origin and are rate limited to 20 per 10 seconds per IP.
- The UI updates optimistically and rolls back if a request fails.

**Legacy URLs.** The old `.html` pages and root-level project URLs (`/zoinpark`, …) permanently redirect to their new routes.

## Deploying to Vercel

1. Import the repository. Leave the framework preset as Next.js.
2. Connect an **Upstash Redis** store and a **private Vercel Blob** store to the project. This sets the Redis and `BLOB_READ_WRITE_TOKEN` variables.
3. Add `CRON_SECRET` (a long random string) as a Production environment variable.
4. Deploy. The daily backup cron is activated from `vercel.json`.

To carry over a total from an earlier deployment, set the Redis key `rejoan-portfolio:click-me` to that number before switching traffic.
