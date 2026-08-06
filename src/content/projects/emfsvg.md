---
name: emfsvg
title: EMF→SVG
tagline: Microsoft EMF to SVG, in pure Ruby.
description: >-
  Reads Microsoft Enhanced Metafile (EMF) records and emits clean SVG. The
  foundation of vector conversion for any publication pipeline that receives
  diagrams from Windows applications.
category: conversion
github: https://github.com/claricle/emfsvg
docs: https://github.com/claricle/emfsvg#readme
featured: true
language: ruby
order: 3
---

EMF is what Microsoft Office emits when you copy a vector drawing. EMF→SVG
turns that binary record stream into the SVG your browser, document pipeline,
or print workflow actually wants.

Used by [`vectory`](/projects/#vectory) as the EMF leg of pairwise conversion.
