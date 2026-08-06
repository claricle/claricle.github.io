# 01 — Brand system & tokens

Define the brand as code so every other task references it.

## Deliverables

- [x] `src/styles/brand.css` with Tailwind 4 `@theme` block
- [x] Spectrum tokens: coral `#e56b5b`, amber `#f7bc68`, forest `#3f7f55`, sky `#588ac4`, plum `#ad89b6`
- [x] Neutral tokens: mist `#dddddd`, plus light/dark canvas + ink scales
- [x] Font tokens: Inter variable display + body, system mono
- [x] Dark mode variant via `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]` attribute

## Verification

- Run `npm run build` — Tailwind picks up tokens, no warnings
- Both `.bg-spectrum-coral` and `var(--color-spectrum-coral)` resolve in built CSS

## Done when

`brand.css` exists, all 6 spectrum + neutral tokens defined, Tailwind build is clean.
