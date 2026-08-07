---
name: postscript
title: PostScript
tagline: Pure-Ruby PS / EPS parser, typed model, and serializer.
description: >-
  Parses Adobe PostScript (PS) and Encapsulated PostScript (EPS) source into a
  typed AST, manipulates it as a first-class domain model, and serializes it
  back to source. The lower layer of postsvg; independently reusable for any
  tool that needs to read, write, or transform PostScript.
category: page-description
github: https://github.com/claricle/postscript
docs: https://github.com/claricle/postscript#readme
featured: false
language: ruby
order: 170
---

## Install

```sh
gem install postscript
```

## Usage

```ruby
require "postscript"

program = Postscript::Source.parse(<<~PS)
  %!PS-Adobe-3.0 EPSF-3.0
  %%BoundingBox: 0 0 100 100
  newpath
  10 10 moveto
  90 10 lineto
  90 90 lineto
  10 90 lineto
PS
```

PS is a full programming language, not just a format. This gem handles
the subset that real-world EPS files actually use, with extension points
for the rest. Consumed by [`postsvg`](/projects/#postsvg) for the PS leg
of vector conversion.
