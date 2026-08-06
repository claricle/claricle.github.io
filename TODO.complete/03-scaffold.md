# 03 — Astro project scaffold

## Deliverables

- [x] `package.json` with exact versions: astro@7, vite@8 (transitive), tailwindcss@4, @tailwindcss/vite@4, @astrojs/vue@7, vue@3, typescript, vitest@4, @astrojs/check, eslint, @fontsource-variable/inter
- [x] `astro.config.mjs` — Vue integration, `@tailwindcss/vite` plugin, site URL, markdown config
- [x] `tsconfig.json` — strict, extends `astro/tsconfigs/strict`
- [x] `.gitignore` — node_modules, dist, .astro, .DS_Store
- [x] `src/styles/brand.css` imported once in layout
- [x] `src/content.config.ts` with projects collection schema (Zod)
- [x] Vitest config in `vitest.config.ts`

## Verification

- `npm install` completes
- `npm run dev` serves at localhost:4321
- `npm run build` produces `dist/index.html`

## Done when

All commands run clean; no type errors; build succeeds.
