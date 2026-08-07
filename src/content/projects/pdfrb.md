---
name: pdfrb
title: Pdfrb
tagline: Pure-Ruby PDF reader, model, and serializer.
description: >-
  Byte-level PDF reader, Arlington-model-driven typed domain model, and
  serializer. The PDF object model is sourced directly from vendored
  Arlington PDF Model TSVs (the machine-readable definition of ISO
  32000-2:2020), so field metadata, version predicates, and validators stay
  aligned with the spec by data, not by hand-coded mimicry.
category: page-description
github: https://github.com/claricle/pdfrb
docs: https://github.com/claricle/pdfrb#readme
featured: false
language: ruby
order: 190
---

## Two-direction contract

- **PDF file ↔ Model** — parse PDF bytes into a typed Model and serialize
  a Model back to PDF bytes. Round-trip is the correctness backbone.
- **API Builder Input → Model** — `Document` and `Canvas` build a typed
  Model from user intent, which the serializer then writes.

Pdfrb is deliberately scoped to the PDF byte format. Layout concerns
(page templates, flows, line breaking, tables) live in the sibling
`arroolio` gem. Mirrors the layered design of
[`postscript`](/projects/#postscript).
