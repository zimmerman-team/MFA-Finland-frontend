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

import path from "path";
import validateImage from "../plugins/index";

Cypress.Commands.add("acceptCookie", () => {
  cy.visit("localhost:3000");
  cy.wait(10000);
  cy.get('[test-id="main-page-accept"]').click();
});

Cypress.Commands.add("checkPNG", () => {
  // image comes from a domain different from the page
  cy.get("p").contains("PNG").click({
    force: true,
  });
  cy.log("**confirm downloaded image**");
  validateImage();
});

Cypress.Commands.add("checkTooltip", () => {
  cy.get('[aria-label="Toggle more options"]').click();
  cy.get('[aria-label="Share"]').trigger("mouseover", {
    force: true,
  });
  cy.get(".MuiTooltip-popper").should("be.visible");
  cy.get('[aria-label="Download"]').click();
});

Cypress.Commands.add("checkCSV", (file, length) => {
  cy.get('[id="download-csv"]').click();
  cy.log("**read downloaded file**");
  const downloadsFolder = Cypress.config("downloadsFolder");
  const filename = path.join(downloadsFolder, file);
  cy.readFile(filename, { timeout: 15000 }).should("have.length.gt", length);
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
  cy.waitLoader("geo-loader");
  // tooltip in right side
  cy.get(
    '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
  ).click();
  cy.get(
    '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
  ).click();
  cy.get("h6").contains("Non-country specific development cooperation");
});

Cypress.Commands.add("checkRegion", (id) => {
  // Regions-hover
  cy.get('[id="' + id + '"]').trigger("mouseover", {
    force: true,
  });
  cy.get("b").contains(id);
  // Regions-click
  cy.get('[id="' + id + '"]').click({ force: true });
  cy.get("b").contains(id).should("exist");
  cy.get('[data-cy="CloseButton"]').click();
});

Cypress.Commands.add("checkSDG", (index, id) => {
  cy.get('[aria-label="SDG: ' + index + " - " + id + '"]').trigger(
    "mouseover",
    { force: true }
  );
  cy.get("b").contains(id).should("be.visible");
});

Cypress.Commands.add("checkCharts", () => {
  // Overview Disbursements
  cy.waitLoader("oda-loader");
  cy.get('[id="viz-scroller"]').should("exist");
  // Thematic areas
  cy.waitLoader("thematic-loader");
  cy.get('[data-cy="viz-pie-chart"]').should("exist");
  // Sectors
  cy.waitLoader("sectors-loader");
  cy.get(".rv-xy-plot__inner").should("exist");

  cy.waitLoader("budgetlines-loader");
  cy.get('[id="viz-scroller"]').eq(1).should("exist");
  cy.checkMapContent();

  cy.get("header").should("exist");
  cy.get("footer").should("exist");
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
