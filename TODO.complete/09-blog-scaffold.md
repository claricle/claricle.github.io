# 09 — Blog scaffold

No posts yet, but the structure must be ready.

## Deliverables

- [x] `src/pages/blog/index.astro` — lists posts (empty state: "No posts yet, watch this space")
- [x] `src/pages/blog/[...slug].astro` — renders a single post via `BlogPost.astro` layout
- [x] `src/content.config.ts` — `blog` collection schema (title, date, author, description, tags)
- [x] Empty `src/content/blog/` directory with `.gitkeep`

## Verification

- `/blog/` returns 200 with empty-state copy
- Adding a stub markdown file makes it appear in the list

## Done when

Index renders; dynamic route works once content exists.
