// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("acceptCookie", () => {
  cy.visit("localhost:3000");
  cy.wait(10000);
  cy.get('[test-id="main-page-accept"]').click();
});

Cypress.Commands.add("search", (label) => {
  cy.get('[aria-label="Search in application"]').click().type(label);
  cy.wait(5000);
  cy.get('[data-cy="search-result-navigation"]').should("be.visible");
});

Cypress.Commands.add("searchContains", (id, label) => {
  cy.get('[data-cy="search-result-item-0"]').click();
  cy.wait(2000);
  cy.get(id).contains(label);
});

Cypress.Commands.add("waitLoader", (dataCy, timeout = 50000) => {
  cy.get(`[data-cy=${dataCy}]`, { timeout }).should("not.exist");
});
