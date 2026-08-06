# Claricle — https://www.claricle.org

Public site for the Claricle open-source image suite, an [open source project of Ribose](https://www.ribose.com).

[![CI](https://github.com/claricle/claricle.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/claricle/claricle.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/claricle/claricle.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/claricle/claricle.github.io/actions/workflows/deploy.yml)

## Stack

- [Astro 7](https://astro.build) — site framework, content collections, islands
- [Vite 8](https://vite.dev) — bundled by Astro
- [Tailwind 4](https://tailwindcss.com) via `@tailwindcss/vite` (CSS-first, no JS config)
- [Vue 3](https://vuejs.org) via `@astrojs/vue` — interactive islands only
- TypeScript strict, Vitest for tests

## Development

```sh
npm install      # install deps
npm run dev      # dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # serve the built site
npm run check    # astro check (type diagnostics)
npm run lint     # eslint
npm test         # vitest run
```

See [`CLAUDE.md`](./CLAUDE.md) for architecture and conventions.

## Brand

The Claricle logo lives at `logo-claricle.png` (canonical, 200×200 RGBA). The
SVG variant in `public/` is derived from it. The 5-color palette is extracted
from the logo and declared as Tailwind tokens in `src/styles/brand.css`:

| Token | Hex | Category |
|---|---|---|
| coral | `#e56b5b` | Conformance |
| amber | `#f7bc68` | Conversion |
| forest | `#3f7f55` | Page description |
| sky | `#588ac4` | Parsers |
| plum | `#ad89b6` | Layout & diagrams |

## Adding a project

Drop a markdown file in `src/content/projects/` with frontmatter per the
schema in `src/content.config.ts`. The schema is the single source of truth;
components consume it, never hardcode project info.

## License

BSD-2-Clause. Maintained by [Ribose](https://www.ribose.com).
