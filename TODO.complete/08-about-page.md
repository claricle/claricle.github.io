# 08 — About page

Modeled on `lutaml.github.io/about.md`. Explain the project's identity.

## Deliverables

- [x] `src/pages/about.astro`
- [x] Sections:
  - **Etymology & symbolism** — clari- (Latin *clārus*) + -cle (particle). "Clear particle / bright essence."
  - **The logo** — `LogoShowcase` component with the 5-band rainbow glyph; explain "upward rainbow" metaphor
  - **The colors** — `ColorPalette` component with 6 swatches + hex + role
  - **Origin story** — why Ribose built this (image toolchain for publication pipelines)
  - **Mission** — one paragraph
  - **The ecosystem** — table linking out to all repos by category
  - **Open source** — BSD-2-Clause, Ribose-maintained, contribute via GitHub
  - **Get started** — install snippet (`gem install claricle`) + link to projects

## Verification

- All 5 spectrum colors rendered in palette section
- Logo display works in light + dark themes
- Ecosystem table links all resolve

## Done when

About page tells the brand story end-to-end; matches lutaml depth.
