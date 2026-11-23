---
name: pngcheck
title: pngcheck
tagline: Development of pngcheck 4 — the PNG file inspector.
description: >-
  Development home of pngcheck 4, the canonical PNG chunk inspector. Verifies
  the internal structure of PNG, JNG, and MNG files — chunk by chunk, byte by
  byte — the tooling lens over the raster format.
category: conformance
role: lens
github: https://github.com/claricle/pngcheck
docs: https://github.com/claricle/pngcheck#readme
featured: false
language: c
order: 145
---

pngcheck is the reference tool for answering "is this PNG well-formed?" —
it walks the chunk stream, validates CRCs and constraints, and reports
exactly where a file deviates from ISO/IEC 15948.

This repository develops pngcheck 4. The Ruby-side conformance lens over PNG
is [`png_conform`](/projects/#png_conform).
