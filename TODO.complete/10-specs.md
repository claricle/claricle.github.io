# 10 — Specs (Vitest)

## Deliverables

- [x] `test/projects-schema.spec.ts` — every project file parses + validates against Zod schema
- [x] `test/projects-invariants.spec.ts`:
  - all `github` URLs match `^https://github.com/claricle/<name>$`
  - no duplicate `name` values
  - every `category` is in spectrum enum
  - ≥5 featured projects (home page promise)
- [x] `test/build.spec.ts` — runs `astro build` in child process; fails if exit code ≠ 0 or `dist/index.html` missing
- [x] `vitest.config.ts` — node environment, test glob `test/**/*.spec.ts`

## Verification

- `npm test` — all specs green
- Test names describe the invariant, not the implementation

## Done when

All three spec files pass; CI runs them on PR.
