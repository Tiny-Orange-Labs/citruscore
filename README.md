# Lit Template

The idea of my lit template is to generate a boilerplate that fits my needs. Everything I put into it, is my personal preference.
This abomination includes hapi, graphQL, typescript, lit, lit-localize, tailwind, fontawesome and maybe more in the near future. Overengineering is the future.

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

## Tests

We are using web-test-runner with a combo of chai and open-wc/testing as assertion libraries.
Chai for stuff doesn't need dom and open-wc/testing for stuff that needs a dom.

```bash
npm test
```

To check your coverage with an UI run:

```bash
npm run coverage
```

## Translate

```bash
npm run translate-extract
npm run translate-build
```

or

```bash
npm run translate-all
```

## ToDo

1. bootstrap the whole backend parts
1. E2E tests
1. prevent people to create more js libs
