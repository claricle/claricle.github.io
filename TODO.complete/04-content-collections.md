# 04 — Content collections & data

## Deliverables

- [x] `src/content.config.ts` — Zod schema for `projects` collection (name, title, tagline, description, category enum, github URL constrained to claricle org, docs optional, featured bool, language enum, order number)
- [x] `src/content/projects/*.md` — one file per project, 17 total per spec section 7
- [x] Each frontmatter validates against schema
- [x] Curated `tagline` + `description` per project (no placeholders)

## Categories (must match spectrum set)

- `conformance` — png_conform, svg_conform, pngcheck
- `conversion` — vectory, emfsvg, postsvg
- `page-description` — postscript, postscript-guide, pdfrb
- `parsers` — emf, emf2svg-ruby, libemf2svg, libpng-ruby
- `layout` — elkrb, sirena
- `meta` — claricle, pdf-core-examples

## Featured set

claricle, vectory, emfsvg, svg_conform, png_conform, elkrb, sirena (≥5 required for home).

## Verification

- `npm test` — schema spec passes for all 17 files
- No duplicate `name` values
- All `github` URLs match `^https://github.com/claricle/<name>$`

## Done when

17 valid markdown files exist; tests pass.
