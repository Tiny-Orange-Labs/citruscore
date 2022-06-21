const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'test/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    downloadsFolder: 'test/cypress/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
