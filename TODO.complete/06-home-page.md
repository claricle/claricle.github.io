# 06 — Home page

## Deliverables

- [x] `src/pages/index.astro` composes:
  - `RainbowHero` — logo, headline "Colors give us clarity", sub, two CTAs (Get Started → /projects/, GitHub → org)
  - Upward-rainbow gradient background (spectrum bottom-warm → top-cool)
  - `FeatureGrid` — 4 feature cards (Validate, Convert, Compose, Render)
  - Featured `ProjectsGrid` — pulls `featured: true` from collection
  - `SpectrumStrip` — legend explaining the 5-color system
  - Final CTA band
- [x] Hero copy reinforces etymology: "Clari- (clear) + -cle (particle)"

## Verification

- Home renders in < 1s on cold load
- All 5 spectrum colors visible above the fold
- Featured projects render in `order` ascending
- CTA links resolve to real pages

## Done when

Home page complete; visual hierarchy reads at 10ft glance; copy is on-brand.
