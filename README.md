# hrishabh.in

Personal site of Hrishabh Jain: a static [Astro](https://astro.build) page deployed on Vercel.

## Develop

```sh
bun install
bun run dev        # http://localhost:4321
bun run build      # astro check + static build to dist/
```

## Where things live

- `src/data/`: all content (profile, intro, FAQ, experience, projects, stack, education). Edit text here; the page, JSON-LD (`src/lib/schema.ts`) and `/llms.txt` are all generated from it, so they never disagree.
- `src/components/`: one component per section.
- `src/lib/github.ts`: build-time GitHub fetch. Uses `GITHUB_TOKEN` (GraphQL) if set, otherwise public REST; falls back to `src/data/github-snapshot.json`.
- `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`: generated SEO/AEO files. The sitemap comes from `@astrojs/sitemap`.

## Writing page

`/writing` lists Medium articles (pulled automatically from the RSS feed for `mediumHandle`) plus any X or LinkedIn posts listed in `src/data/writing.ts`. To add a post, paste its URL:

```ts
{ url: "https://x.com/hrishabh_hj/status/…" },
{ url: "https://www.linkedin.com/feed/update/urn:li:activity:…/" },
```

The text, date, image and reactions are fetched at build time. Add `title`, `text`, `date` or `image` to override any of them. The home page shows the 3 latest pieces.

`public/og.png` is the 1200×630 social share image.

## Scripts

- `bun run github:snapshot`: refresh the committed GitHub fallback snapshot.
- `bun run writing:snapshot`: refresh the committed writing fallback snapshot (run after adding posts).

## Deploy setup (one-time)

1. Vercel → Settings → Environment Variables: add `GITHUB_TOKEN`, a fine-grained token with **public repo read-only** access. It gives exact contribution data and avoids rate limits.
2. Vercel → Settings → Git → Deploy Hooks: create a hook for the production branch, then add its URL as the GitHub repo secret `VERCEL_DEPLOY_HOOK`. `.github/workflows/daily-rebuild.yml` triggers it every morning so the GitHub stats stay fresh.
