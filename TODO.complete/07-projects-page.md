# 07 — Projects page

## Deliverables

- [x] `src/pages/projects/index.astro`
- [x] Hero: "The Claricle ecosystem" + spectrum legend
- [x] `ProjectsGrid` with `filterable: true` — mounts `ProjectFilter.vue` island
- [x] All 17 projects grouped or filterable by category
- [x] Each `ProjectCard` shows: name, tagline, category badge (in spectrum color), language badge, links to GitHub + docs

## Verification

- Filter island hydrates without page reload
- Selecting a category hides non-matching cards
- "All" returns to full list
- URL syncs: `?category=conversion` deep-links state

## Done when

Page lists all projects; filter works; deep-link round-trips.
