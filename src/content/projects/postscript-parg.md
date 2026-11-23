---
name: postscript-parg
title: PostScript PARG
tagline: PostScript grammar in PARG — feeds the native parser.
description: >-
  The PostScript grammar written in PARG, the parsanol grammar language.
  The compiled artifact feeds the `postscript` gem's native parser engine,
  producing the same tokens, programs, and errors as the default Ruby lexer.
category: parsers
role: model
github: https://github.com/claricle/postscript-parg
docs: https://github.com/claricle/postscript-parg#readme
featured: false
language: grammar
order: 180
---

PostScript language levels are vocabulary data, not grammar: one PARG grammar
parses every level, and an operator's level comes from the PostScript
Language Guide's operator pages.

The compiled grammar runs on the parsanol native engine via
`Postscript.parse(source, engine: :native)` in the
[`postscript`](/projects/#postscript) gem. It is parity-gated: where the
grammar rejects a source, the Ruby lexer still tokenizes it.
