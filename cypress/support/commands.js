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

Cypress.Commands.add("checkBudgetLine", () => {
  cy.get("._StyledDiv2-kDlTqH").should("exist");
});

Cypress.Commands.add("checkOrganisation", (id) => {
  //hover
  cy.get('[aria-label="' + id + '"]').click({ force: true });
  cy.get(".treemap___StyledDiv-dnl4if-0").should("be.visible");
  //click
  cy.get('[aria-label="' + id + '"]').click({ force: true });
  cy.get("b").contains(id).should("exist");
  cy.get(".clgFzd").click();
});

Cypress.Commands.add("checkMapContent", () => {
  // tooltip in right side
  cy.get(
    '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
  ).click();
  cy.get(
    '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
  ).click();
  cy.get(".Collapseable___StyledDiv2-sc-18do71n-3").should("be.visible");

  //Disbursements amount
  cy.get(".Legend___StyledDiv2-sc-12zjtsg-2").should("exist");
});

Cypress.Commands.add("checkRegion", (id) => {
  // Regions-hover
  cy.get('[id="' + id + '"]').trigger("mouseover", {
    force: true,
  });
  cy.get(".treemap___StyledDiv-dnl4if-0").should("be.visible");
  // Regions-click
  cy.get('[id="' + id + '"]').click({ force: true });
  cy.get("b").contains(id).should("exist");
  cy.get(".clgFzd").click();
});
