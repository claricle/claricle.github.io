---
name: postsvg
title: Postsvg
tagline: Pure-Ruby PS / EPS ↔ SVG transformer.
description: >-
  Bidirectional PostScript and Encapsulated PostScript transformer: PS ↔ SVG
  and SVG → EPS. Uses Nokogiri for the SVG side and a hand-written
  comment-aware lexer and stack-machine interpreter for the PS source side.
  No Ghostscript, no Inkscape — the entire pipeline runs in Ruby.
category: conversion
github: https://github.com/claricle/postsvg
docs: https://github.com/claricle/postsvg#readme
featured: false
language: ruby
order: 115
---

## Install

```sh
gem install postsvg
```

Output is typed: the same `Postsvg::Model::Program` is produced whether the
source was parsed from PS or built from SVG, so round-trips are trivial.

Built on [`postscript`](/projects/#postscript) for the PS leg. Pairs with
[`vectory`](/projects/#vectory) for end-to-end vector conversion across EPS,
PS, EMF, and SVG.
