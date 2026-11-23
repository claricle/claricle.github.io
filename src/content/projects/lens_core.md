---
name: lens_core
title: Lens Core
tagline: One report model for every conformance checker.
description: >-
  A small, dependency-free model for conformance diagnostics: a single report
  shape any format checker can emit, rendered as machine-readable JSON or
  YAML and as human-readable text from the same model.
category: conformance
role: lens
github: https://github.com/claricle/lens_core
rubygems: https://rubygems.org/gems/lens_core
docs: https://github.com/claricle/lens_core#readme
featured: false
language: ruby
order: 130
---

Each diagnostic records what is wrong (`kind`), how serious it is
(`severity`), where it is — line and column for text formats, byte offset and
record for binary ones — and which rule of which specification or profile it
breaks.

## Usage

```ruby
require "lens_core"

report = LensCore::Report.new(
  producer: LensCore::Producer.new(name: "my-checker", version: "1.0.0"),
  profile: LensCore::Profile.new(id: "my-profile"),
  valid: false,
  diagnostics: [
    LensCore::Diagnostic.new(
      severity: "error", kind: "bad_checksum", requirement_id: "REC-001",
      message: "Record checksum does not match.",
      location: LensCore::Location.binary(byte_offset: 0, record_index: 0)
    )
  ]
)

puts LensCore::Renderers::Json.render(report)
puts LensCore::Renderers::Human.render(report)
```

The wire format is specified by `schemas/lens-diagnostics-v1.json`, so
[`png_conform`](/projects/#png_conform), [`svg_conform`](/projects/#svg_conform),
and any other checker can share one diagnostic vocabulary.
