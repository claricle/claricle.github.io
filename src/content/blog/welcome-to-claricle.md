---
title: Welcome to Claricle
description: What Claricle is, why we built it, and what to expect on this blog.
pubDate: 2026-08-06
author: Ronald Tse
tags: [announcement, claricle]
---

Welcome to the Claricle blog. This is where we will publish release notes,
deep dives into image formats, and the occasional story from the publication
pipelines that motivated the project.

## What Claricle is

Claricle is an open-source image suite for publication pipelines: a family of
pure-Ruby libraries that validate, convert, and render images across the
formats a real publication workflow encounters — PNG, SVG, EMF, EPS, PDF, and
friends.

The umbrella gem, [`claricle`](https://github.com/claricle/claricle), ties
the pieces together behind a single CLI:

```sh
gem install claricle
claricle validate ./diagram.svg
claricle convert ./diagram.emf ./diagram.svg
```

## Why we built it

Publication pipelines at standards-development organisations ingest diagrams
from authors on Windows (EMF), from print-era designers (EPS), from web tools
(SVG), and from screenshots everywhere (PNG). Each format has its own
quirks; each tool that handles it has its own dependencies.

Claricle exists to give those pipelines pure-Ruby, dependency-free tools that
do each format correctly. Read the [about page](/about/) for the full
origin story.

## What to expect here

- **Release notes** when a library ships a new version
- **Deep dives** into individual formats and how Claricle handles them
- **Architecture posts** about the ecosystem internals
- **Community spotlights** when someone builds something neat on top

Star [the org on GitHub](https://github.com/claricle) to follow along.
