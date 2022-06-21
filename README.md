# Lit Template
The idea of my lit template is to generate a boilerplate
that fits my needs. Everything I put into it, is my personal 
preference. 

## NPM Scripts
### serve

Opens a test server to serve files

### watch 

Start the test server, same as `npm run serve`. Watches files and rebuilds after a change.

### build

Builds dev and production. Can be found in dist/dev and dist/prod 

### buildDev

Builds dev only. Can be found in dist/dev.

### buildProd

Builds production only. Can be found in dist/prod.

## Tests
### Qunit
For unit testing we use qunit just start your demo server with
`npm run server` and visit http://localhost:3000/unit-tests/ in your browser.

### Cypress
For e2e testing we use cypress, run `npm test` and cypress automatically opens.