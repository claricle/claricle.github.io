# Claricle.github.io — Design Spec

**Date:** 2026-08-06
**Status:** Approved, ready for implementation
**Owner:** Ronald Tse (Ribose)

## 1. Purpose

Build the public website for **Claricle** — Ribose's open-source image suite for publication. The site is the canonical entry point for users discovering the project family: what it is, why it exists, which libraries exist, and where to find them.

The site is **not** docs for any individual library — those live in each repo. This site is the marketing + ecosystem index + brand narrative layer above.

## 2. Tech stack

- **Astro 7** — site framework
- **Vite 8** — bundled by Astro
- **Tailwind 4** via `@tailwindcss/vite` (CSS-first, no JS config)
- **Vue 3** via `@astrojs/vue` — interactive islands only
- **TypeScript** strict
- **Vitest 4** — data-integrity tests

## 3. Brand system

### 3.1 Logo

Canonical source: `logo-claricle.png` (200×200, RGBA). Extracted via histogram analysis.

The logo's glyph is a 5-band upward-rising rainbow arranged as overlapping translucent circles, suggesting clarity emerging through layered color — the project's tagline ("colors give us clarity"). The Latin root *clārus* (clear, bright) + *cle* (particle) is reinforced by the gem-like circular facets.

An SVG variant (`public/logo-claricle.svg`) will be created alongside the PNG for crisp scaling at all viewport sizes. **The PNG is canonical; the SVG is derived.** Neither replaces the other.

### 3.2 Color palette

Extracted directly from the logo (dominant opaque pixels):

| Token | Hex | Role |
|---|---|---|
| `--color-spectrum-coral` | `#e56b5b` | Conformance |
| `--color-spectrum-amber` | `#f7bc68` | Conversion |
| `--color-spectrum-forest` | `#3f7f55` | Page description |
| `--color-spectrum-sky` | `#588ac4` | Parsers & libraries |
| `--color-spectrum-plum` | `#ad89b6` | Layout & diagrams |
| `--color-mist` | `#dddddd` | Neutral surfaces |

In rainbow-upwards order (warm bottom → cool top): coral → amber → forest → sky → plum.

Light-mode neutrals: `#fdfdfd` canvas, `#1a1a1a` ink, `#666` muted ink.
Dark-mode neutrals: `#0f0f12` canvas, `#f0f0f0` ink, `#9a9a9a` muted ink.

### 3.3 Typography

Display + body: **Inter** (variable, via `@fontsource-variable/inter`). Monospace for code: `ui-monospace, SFMono-Regular, Menlo, monospace`. No display script or novelty faces — the rainbow already carries the personality.

## 4. Information architecture

```
/                       Home — hero, premier projects, spectrum, features, CTA
/projects/              All projects grouped by spectrum category
/about/                 Etymology, logo, colors, origin, ecosystem
/blog/                  Index (scaffold, ready for posts)
/blog/<post>/           Individual post (markdown)
```

Top nav: Projects, About, Blog, GitHub icon.
Footer: copyright, Ribose attribution, spectrum strip as a thin top border.

External docs (`/docs/<project>/`) are out of scope for v1 — link to per-repo READMEs.

## 5. Component architecture

```
src/
  components/
    BaseLayout.astro        # shell: head, nav, footer, slot
    Nav.astro               # top navigation
    Footer.astro            # footer with attribution
    RainbowHero.astro       # home hero with upward gradient + logo + CTA
    SpectrumStrip.astro     # 5-color legend (reused)
    ProjectCard.astro       # one project card, props-driven
    ProjectsGrid.astro      # grid wrapper, takes projects[]
    ProjectFilter.vue       # Vue island — client-side category filter
    LogoShowcase.astro      # about page — light/dark logo display
    ColorPalette.astro      # about page — swatches with hex
    FeatureGrid.astro       # home page — feature highlights
  content/
    projects/               # one markdown file per project
      vectory.md
      emfsvg.md
      …
  layouts/
    (BaseLayout is the only layout — kept in components/ for simplicity)
  pages/
    index.astro
    about.astro
    projects/index.astro
    blog/index.astro
    blog/[...slug].astro
  styles/
    brand.css               # @theme block — single source of brand tokens
  content.config.ts         # Zod schema for projects collection
```

### 5.1 Component contracts

- `ProjectCard.astro` props: `{ project: CollectionEntry<'projects'>['data'] }`. No network, no collection reads.
- `ProjectsGrid.astro` props: `{ projects: CollectionEntry<'projects'>[]; filterable?: boolean }`. When `filterable`, mounts `ProjectFilter.vue` as an island.
- `ProjectFilter.vue` props: `{ categories: string[]; initial: string }`. Emits filter events via shared store (nanostores) or via URL query param `?category=`.

## 6. Content model

`src/content.config.ts` defines one collection:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const SpectrumCategory = z.enum([
  'conformance', 'conversion', 'page-description',
  'parsers', 'layout', 'meta'
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: SpectrumCategory,
    github: z.string().url().regex(/^https:\/\/github\.com\/claricle\//),
    docs: z.string().url().optional(),
    featured: z.boolean().default(false),
    language: z.enum(['ruby', 'c', 'shell', 'html']).default('ruby'),
    order: z.number().default(100),
  }),
});

export const collections = { projects };
```

## 7. Initial project set

Seeded from the `claricle` org (17 public repos). Curated, not exhaustive — repos with empty READMEs are listed with `tagline` from org description; others get a real tagline from their README.

| Repo | Category | Featured |
|---|---|---|
| claricle | meta | yes |
| vectory | conversion | yes |
| emfsvg | conversion | yes |
| svg_conform | conformance | yes |
| png_conform | conformance | yes |
| pngcheck | conformance | no |
| postsvg | conversion | no |
| emf | parsers | no |
| emf2svg-ruby | parsers | no |
| libemf2svg | parsers | no |
| libpng-ruby | parsers | no |
| postscript | page-description | no |
| postscript-guide | page-description | no |
| pdfrb | page-description | no |
| elkrb | layout | yes |
| sirena | layout | yes |
| pdf-core-examples | meta | no |

## 8. Tests

`test/` directory, Vitest:

1. `test/projects-schema.spec.ts` — every project file parses + validates.
2. `test/projects-invariants.spec.ts` —
   - all `github` URLs match `^https://github.com/claricle/<name>$`
   - no duplicate `name` values
   - every `category` is in the spectrum set
   - at least 5 featured projects exist (home page promise)
3. `test/build.spec.ts` — runs `astro build` in a child process; fails if exit code ≠ 0 or `dist/index.html` missing.

## 9. CI / Deploy

`.github/workflows/deploy.yml`:
- On push to `main`: install, build, deploy `dist/` to GitHub Pages via `actions/deploy-pages`.
- On PR: install, lint, test, build (no deploy).
- Permissions: `pages: write`, `id-token: write`, `contents: read`.

## 10. Out of scope for v1

- Per-project sub-sites (e.g. `/vectory/`) — link externally for now.
- Blog content — index page exists, no posts yet.
- Search — add when content volume justifies it.
- i18n — English only at launch.
- RSS feed — add with first blog post.

## 11. Open questions

None blocking. Opened issues preferred over inline TODOs for follow-ups.
