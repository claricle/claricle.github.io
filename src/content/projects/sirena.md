---
name: sirena
title: Sirena
tagline: Diagram rendering for PlantUML and Mermaid.
description: >-
  Render PlantUML and Mermaid diagrams in Ruby. Sirena parses the source
  notation, lays out the elements via ELK.rb, and emits SVG ready for
  documentation pipelines.
category: layout
github: https://github.com/claricle/sirena
docs: https://github.com/claricle/sirena#readme
featured: true
language: ruby
order: 7
---

Sirena exists because Metanorma and similar document pipelines need to render
diagrams deterministically, in CI, without a headless browser or a Java
toolchain.

Pair with [`elkrb`](/projects/#elkrb) for the layout geometry.
