---
name: libemf2svg
title: libemf2svg
tagline: MS EMF to SVG conversion library (C).
description: >-
  The C library that converts Microsoft (MS) EMF metafiles to SVG — the
  original engine of the suite's EMF ingestion spoke, exposed to Ruby through
  [`emf2svg-ruby`](/projects/#emf2svg-ruby).
category: conversion
role: engine
github: https://github.com/claricle/libemf2svg
docs: https://github.com/claricle/libemf2svg#readme
featured: false
language: c
order: 150
---

libemf2svg is the legacy C lineage of the EMF ingestion spoke. For new work,
prefer the pure-Ruby [`emfsvg`](/projects/#emfsvg) port, which replaces the
C dependency entirely; this library remains for pipelines that already link
against it.
