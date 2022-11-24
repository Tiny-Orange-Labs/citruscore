# Lit Template

The idea of my lit template is to generate a boilerplate that fits my needs. Everything I put into it, is my personal preference.
This abomination includes typescript, lit, tailwind, fontawesome and maybe more in the near future. Overengineering is the future.

## Building

happens in multiple stages and can be split up to its indiviual parts.
This is the order it executes the different builds:

1. npm run build-ts
1. npm run build-rollup
1. npm run build-html
1. npm run build-css

if you want to build everything:

```bash
npm run build-all
```

## ToDo

1. bootstrap the whole backend part
1. prevent people to create more js libs
