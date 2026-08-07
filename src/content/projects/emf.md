---
name: emf
title: EMF
tagline: Pure-Ruby parser for WMF, EMF, and EMF+ metafiles.
description: >-
  Clean-room, pure-Ruby parser for the three Microsoft Windows metafile
  formats — WMF (Windows Metafile), EMF (Enhanced Metafile), and EMF+
  (Enhanced Metafile Plus). Reads binary input into an OOP domain model and
  serializes the model back to binary. The parsing half of emfsvg.
category: parsers
github: https://github.com/claricle/emf
docs: https://github.com/claricle/emf#readme
featured: false
language: ruby
order: 125
---

## Status

- **EMF** — full parse + byte-identical round-trip on every fixture
- **EMF+** — payloads extracted from EMF carrier records as raw bytes;
  structured parsing in progress
- **WMF** — format detection; structured parsing on the roadmap

Replaces the FFI-based [`emf2svg-ruby`](/projects/#emf2svg-ruby) wrapper
around the GPLv2 `libemf2svg` C library. BSD-2-Clause — no GPL obligation.
