# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Source for [claricle.org](https://www.claricle.org) — the public marketing/docs site for the **Claricle** open-source project of [Ribose](https://www.ribose.com). Claricle is an "essential image suite for publication": a family of pure-Ruby (plus a few C) libraries for image format validation, conversion, compression, and vector graphics processing.

This repo contains **only the website**. The Ruby gems live in the [`claricle` GitHub org](https://github.com/claricle) (e.g. `claricle/claricle`, `claricle/vectory`, `claricle/emfsvg`, `claricle/svg_conform`). Project data on this site is a curated marketing view of those repos — when a repo changes, update the data here; do not mirror the org wholesale.

## Tech stack (do not silently change)

- **Astro 7** — site framework, content collections, islands
- **Vite 8** — bundled by Astro
- **Tailwind 4** via `@tailwindcss/vite` — CSS-first config, no `tailwind.config.js`
- **Vue 3** via `@astrojs/vue` — interactive islands only (most pages are static)
- **TypeScript** strict
- **Vitest 4** — unit tests for data/schema integrity

If a contributor wants to add React/Svelte/Solid, push back: Vue islands cover the interactive surface, and the brand site has no need for heavier runtime.

## Commands

```bash
npm install              # install deps
npm run dev              # dev server at http://localhost:4321
npm run build            # production build to ./dist
npm run preview          # serve the built site
npm run check            # astro check (type diagnostics for .astro)
npm run lint             # eslint
npm test                 # vitest run (one-shot)
npm run test:watch       # vitest watch
npm run test -- path/to/spec  # run a single test file by path
```

## Architecture

### Content is the source of truth

Every project page-rendering path consumes `src/content/projects/*.md` through Astro Content Collections. The schema in `src/content.config.ts` is the **single source of truth** for what a Project is. Components and pages never hardcode project names, URLs, or categories — they get them from the collection.

To add a project: drop a markdown file in `src/content/projects/`, fill the frontmatter per the schema. To change how all projects render: edit the components.

### Brand tokens live in `src/styles/brand.css`

Tailwind 4 `@theme` block defines the spectrum palette as both CSS variables (`--color-spectrum-*`) and utility classes (`bg-spectrum-coral`, etc.). The palette is extracted from `logo-claricle.png` (the canonical logo source) and must stay in sync with it. Do not invent new brand colors — extend the neutral scale if you need grays.

The spectrum, in rainbow-upwards order:

| Token | Hex (light) | Hex (dark) | Category it represents |
|---|---|---|---|
| `--color-spectrum-coral` | `#e56b5b` | `#ff886a` | Conformance |
| `--color-spectrum-amber` | `#f7bc68` | `#fcba49` | Conversion |
| `--color-spectrum-forest` | `#3f7f55` | `#5fffa6` | Page description |
| `--color-spectrum-sky` | `#588ac4` | `#51a2ff` | Parsers & libraries |
| `--color-spectrum-plum` | `#ad89b6` | `#ffa1bf` | Layout & diagrams |
| `--color-mist` | `#dddddd` | — | Neutral |

### Theme system

Light is the default. Dark mode is opted into via either `prefers-color-scheme: dark` (system) or `[data-theme="dark"]` (manual). A `[data-theme="light"]` attribute overrides the system preference back to light — needed so a manual "light" choice actually wins on a dark-pref system.

Two files drive the manual toggle:

- `src/components/ThemeToggle.astro` — button in the nav. Reads `localStorage['claricle-theme']`, falls back to system preference, persists on click.
- `src/components/BaseLayout.astro` has an inline, pre-paint `<script is:inline>` that applies any stored theme before the first paint — prevents FOUC.

### Logo assets

`logo-claricle.png` at the repo root is the **canonical source** — never delete, never overwrite without explicit user approval. The PNG is the original designer's vector-traced artwork.

Public assets derived from it:

- `public/logo-claricle.svg` — medium-saturation variant, used for OG image references
- `public/logo-claricle.png` — 834×834 high-resolution PNG for Open Graph previews
- `public/logo-claricle_icon-light.svg` / `.png` — light-mode icon variant (saturated colors that pop on white)
- `public/logo-claricle_icon-dark.svg` / `.png` — dark-mode icon variant (luminous colors that glow on dark)
- `public/favicon.svg`, `favicon-96x96.png`, `favicon.ico`, `apple-touch-icon.png` — favicon set
- `public/logo-claricle.pdf` — designer's PDF source (preserved, do not modify)

`src/components/Logo.astro` is the **only** place that decides which logo variant to show. It takes `variant="auto"` (default) and swaps between light/dark via CSS based on `prefers-color-scheme` and `[data-theme]`. Use `<Logo size={N} />` everywhere — never hardcode `<img src="/logo-...">` in components.

### Components are dumb, data is smart

- `BaseLayout.astro` — site shell (head, nav, footer)
- `RainbowHero.astro` — home hero with the upward-rainbow gradient
- `ProjectCard.astro` — props-driven, renders one project; no fetching
- `ProjectsGrid.astro` — takes a list of projects, lays them out, optional filter island
- `ProjectFilter.vue` — Vue island, the only client-side interactivity (category filter)
- `SpectrumStrip.astro` — the rainbow legend, reused in hero + about
- `LogoShowcase.astro` / `ColorPalette.astro` — about-page display

If a new component would duplicate data flow that the collection already owns, it goes in `data/` (helpers) or `content/` (a new collection), not in the component.

### Tests are data-integrity tests

There is no UI to unit-test meaningfully — Astro components are mostly markup. The tests in `test/` enforce invariants that matter:

- Every project markdown file validates against the Zod schema
- Every project's `category` is in the spectrum set
- Every project's `github` URL points at `github.com/claricle/`
- No two projects share a `name`
- Featured projects render on the home page (smoke test by querying the collection)

When adding a new invariant, add a new test file. Do not pile more asserts into one test.

## Files never to delete or modify without explicit user approval

Per the project owner's global rules (see `~/.claude/CLAUDE.md`):

- `logo-claricle.png` and any other binary brand asset — **source of truth**, never delete even if "unused by code". The SVG variant in `public/` is *derived* from it, not a replacement.
- Anything in `TODO.complete/` once marked done — historical record.
- `.gitignore`, `.github/workflows/*` — modify only with a clear reason.

## Workflow rules

- **Never commit to `main`.** Always work on a `feat/*` or `fix/*` branch and open a PR.
- **Never push git tags.** Releases are the owner's decision.
- **Never add AI attribution** to commits, PRs, or code comments.
- **Never use `git add -A` or `git add .`** — stage explicit file paths and verify with `git diff --cached --name-only` before committing.

## Deploy

GitHub Actions workflow in `.github/workflows/deploy.yml` builds `dist/` and deploys to GitHub Pages on push to `main`. The production custom domain is `www.claricle.org`. Do not change the workflow's permissions or environment name without coordinating — a bad deploy breaks the canonical URL.
