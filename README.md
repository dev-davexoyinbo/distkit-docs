# distkit docs

Documentation site for [distkit](https://github.com/dev-davexoyinbo/distkit), built with Nuxt 4 + Nuxt UI + Nuxt Content.

## Requirements

- Node.js (LTS recommended)
- pnpm (this repo pins `pnpm@11.6.0`)

## Setup

```bash
pnpm install
```

`pnpm install` runs `nuxt prepare` (generates `.nuxt/`).

## Development

Start the dev server on `http://localhost:3000`:

```bash
pnpm dev
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
```

## Production

```bash
pnpm build
pnpm preview
```

If the build output looks wrong, clear the Nuxt caches and rebuild:

```bash
rm -rf .nuxt .output node_modules/.cache
pnpm install
pnpm build
```

## Content authoring

- Docs live in `content/` (Markdown + `.navigation.yml`).
- Each page should include frontmatter with at least:
  - `title`
  - `description`
  - `navigation.icon` (Iconify name like `i-lucide-book-open`)
- Folder ordering uses numeric prefixes (e.g. `content/1.getting-started/`).
- Code fences use plain language ids (`rust`, `toml`, `bash`) — avoid modifiers like `rust,no_run`.

## Deployment

The site deploys to GitHub Pages via `.github/workflows/ci.yml` on pushes to `main`.

- Set the repository secret **`NUXT_PUBLIC_GTAG_ID`** (Google tag / GA4 measurement ID) so analytics is wired into the build.
- In repo settings, set **Pages → Source** to **GitHub Actions**.
- The site is served from the `/distkit-docs/` base path (`NUXT_APP_BASE_URL`).

## Useful routes

- Raw Markdown export (LLM-friendly): `GET /raw/<path>.md`
  - Example: `http://localhost:3000/raw/getting-started/installation.md`

## Repository layout

- `app/`: Nuxt UI app (layouts, pages, components)
- `content/`: Nuxt Content sources
- `server/routes/raw/[...slug].md.get.ts`: the `/raw/*.md` route
- `server/mcp/tools/`: MCP tools for listing/getting pages
- `nuxt.config.ts`: Nuxt + Content + nuxt-llms + gtag configuration
