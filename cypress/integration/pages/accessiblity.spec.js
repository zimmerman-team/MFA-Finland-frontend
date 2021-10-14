/// <reference types="cypress" />

context("Accessibility statement", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("should show correct title", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/statements");
    cy.get("h2").contains("Accessibility statement").should("exist");
  });

  it("inpage navigation", () => {
    cy.get('[data-cy="in-page-nav"]').should("exist");
    cy.contains("Accessibility statement").click();
    cy.get('[data-cy="arrow-down-button"]').click();
    cy.get('[data-cy="arrow-up-button"]').click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get('[aria-label="breadcrumb"] [aria-current="page"]').click();
    cy.scrollTo("bottom");
    cy.get('[data-cy="link-to-statement"]').click();
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
  });
});
