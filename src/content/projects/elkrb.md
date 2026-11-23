---
name: elkrb
title: ELK.rb
tagline: Eclipse Layout Kernel for Ruby.
description: >-
  Pure-Ruby implementation of the ELK layered layout algorithm. Lay out
  boxes-and-arrows diagrams (UML, flowcharts, schema diagrams) without a JVM
  dependency.
category: layout
role: engine
github: https://github.com/claricle/elkrb
rubygems: https://rubygems.org/gems/elkrb
docs: https://github.com/claricle/elkrb#readme
featured: true
language: ruby
order: 8
---

ELK is the de facto reference for layered graph layout, but it ships as a
Java library. ELK.rb brings the algorithm to Ruby so the Claricle ecosystem
can lay out diagrams natively — no JRuby, no shell-out to a JVM.

Used by the ecosystem's diagram rendering for layout geometry — any pipeline
that needs deterministic boxes-and-arrows placement can call it directly.
