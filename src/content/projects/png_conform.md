---
name: png_conform
title: PNG Conform
tagline: PNG conformance checking for Ruby.
description: >-
  Validates PNG files against the ISO/IEC 15948 specification — chunk
  structure, IHDR constraints, ancillary chunk semantics. Catches the silent
  corruption that breaks downstream raster pipelines.
category: conformance
github: https://github.com/claricle/png_conform
docs: https://github.com/claricle/png_conform
featured: true
language: ruby
order: 5
---

A PNG that decodes is not necessarily a PNG that conforms. PNG Conform is the
gate that catches metadata lies, missing required chunks, and ancillary data
that breaks strict decoders.
