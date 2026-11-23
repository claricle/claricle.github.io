---
name: svgpng
title: SVG→PNG
tagline: Byte-oriented SVG rendering to PNG, in Ruby.
description: >-
  Renders SVG to PNG through a Ruby-owned pipeline: explicit font selection,
  a pinned PNG encoder, and a native rendering core the gem owns end to end.
  The raster projection of the suite — SVG in, deterministic PNG out.
category: conversion
role: projection
github: https://github.com/claricle/svgpng
rubygems: https://rubygems.org/gems/svgpng
docs: https://github.com/claricle/svgpng#readme
featured: true
language: ruby
order: 5
---

## Usage

```ruby
require "svgpng"

result = Svgpng.render(svg_bytes, profile: {}, fonts: {}, fallback_fonts: [])
result.png_bytes  # => rendered PNG
result.width
result.height
result.warnings
result.font_manifest
```

The API takes bytes, not paths: no filesystem, network, or loader input
crosses the boundary. Fonts are supplied explicitly as
`Svgpng::FontFace.new(bytes:, source_id:)` — metadata comes from the font
bytes, never from system probing.

Rendering requires the packaged native library; without one, `Svgpng.render`
raises `Svgpng::UnsupportedPlatformError` rather than falling back silently.
