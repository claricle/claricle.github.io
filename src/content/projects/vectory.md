---
name: vectory
title: Vectory
tagline: Pairwise vector image conversion in pure Ruby.
description: >-
  Convert between EPS, PS, EMF, and SVG without shelling out to Inkscape or
  Ghostscript. Vectory chains the parser and emitter gems in the Claricle
  ecosystem so a publication pipeline can move a single diagram across every
  format it touches.
category: conversion
github: https://github.com/claricle/vectory
docs: https://github.com/claricle/vectory#readme
featured: true
language: ruby
order: 2
---

## Install

```sh
gem install vectory
```

## Usage

```sh
vectory -f svg diagram.emf
```

```ruby
Vectory::Emf.from_path(path).to_svg.content
Vectory::Eps.from_content(content).to_emf.write.path
```

Format support comes from [`emfsvg`](/projects/#emfsvg) and
[`postsvg`](/projects/#postsvg) — no external binaries required.
