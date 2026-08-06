# 05 — Layout & navigation

## Deliverables

- [x] `src/components/BaseLayout.astro` — site shell
  - `<head>`: meta, OG tags, favicon links, manifest, theme-color
  - Skip-link for a11y
  - `<Nav>` slot
  - `<slot />` for page body
  - `<Footer>` slot
- [x] `src/components/Nav.astro` — sticky top nav, logo + links (Projects, About, Blog) + GitHub icon
- [x] `src/components/Footer.astro` — copyright, Ribose attribution, thin spectrum top border
- [x] Mobile nav: hamburger menu < 768px
- [x] Active link styling based on `Astro.url.pathname`

## Verification

- Keyboard nav: tab through links, skip-link works
- Mobile breakpoint: hamburger appears < 768px
- Footer spectrum border renders in both themes

## Done when

Layout wraps all pages; nav active state correct; responsive at 375px / 768px / 1280px.
