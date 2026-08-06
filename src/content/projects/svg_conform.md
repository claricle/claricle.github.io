---
name: svg_conform
title: SVG Conform
tagline: SVG conformance validation and remediation.
description: >-
  Validates SVG against the W3C specification and repairs the common
  deviations produced by drawing tools. Use it as a gate in any pipeline that
  ingests third-party SVG.
category: conformance
github: https://github.com/claricle/svg_conform
docs: https://github.com/claricle/svg_conform
featured: true
language: ruby
order: 4
---

Ingest pipelines that accept SVG from authors, designers, or upstream tools
regularly encounter out-of-spec markup. SVG Conform flags the violations,
suggests fixes, and where the fix is unambiguous, applies it.

Pair with [`png_conform`](/projects/#png_conform) for raster-side validation.
