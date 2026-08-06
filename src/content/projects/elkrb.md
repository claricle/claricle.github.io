---
name: elkrb
title: ELK.rb
tagline: Eclipse Layout Kernel for Ruby.
description: >-
  Pure-Ruby implementation of the ELK layered layout algorithm. Lay out
  boxes-and-arrows diagrams (UML, flowcharts, schema diagrams) without a JVM
  dependency.
category: layout
github: https://github.com/claricle/elkrb
docs: https://github.com/claricle/elkrb#readme
featured: true
language: ruby
order: 6
---

ELK is the de facto reference for layered graph layout, but it ships as a
Java library. ELK.rb brings the algorithm to Ruby so the Claricle ecosystem
can lay out diagrams natively — no JRuby, no shell-out to a JVM.

Used by [`sirena`](/projects/#sirena) for the geometry of rendered diagrams.
