# 11 — CI & deploy

## Deliverables

- [x] `.github/workflows/deploy.yml`:
  - On push to `main`: install → build → deploy `dist/` to GitHub Pages
  - On PR: install → lint → test → build (no deploy)
  - Permissions: `pages: write`, `id-token: write`, `contents: read`
  - Uses `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`
- [x] `.github/workflows/ci.yml`:
  - On PR: lint, test, typecheck, build
  - Caches `~/.npm` and `.astro`
- [x] `eslint.config.js` — flat config, Astro + TypeScript rules

## Verification

- Workflow files parse (validate with `actionlint` if available)
- PR triggers CI; main triggers deploy
- Deploy job has the correct permissions block

## Done when

Workflows committed; CI green on the initial PR.
