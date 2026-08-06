---
name: claricle
title: Claricle
tagline: The umbrella CLI for the Claricle image suite.
description: >-
  A single gem that bundles Claricle's image utilities — validate, convert,
  and inspect PNG, SVG, EMF, EPS and friends from one command line. Currently
  a shim reserving the gem name; full functionality lands as the underlying
  libraries mature.
category: meta
github: https://github.com/claricle/claricle
docs: https://github.com/claricle/claricle#readme
featured: true
language: ruby
order: 1
---

## Install

```sh
gem install claricle
```

## Commands

```sh
claricle validate <file-pattern>
claricle convert <source> <dest>
claricle compress <file-pattern>
claricle version
```

The CLI is a thin Thor-based dispatcher over the dedicated libraries in the
ecosystem. It exists so publication pipelines can depend on one gem instead
of fifteen.
