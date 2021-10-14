/// <reference types="cypress" />

context("Result", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("should show correct title", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/result");
    cy.get("h2").contains("result").should("exist");
  });

  it("inpage navigation", () => {
    cy.get('[data-cy="in-page-nav"]').should("exist");
    cy.contains("result").click();
    cy.get('[data-cy="arrow-down-button"]').click();
    cy.get('[data-cy="arrow-up-button"]').click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get('[aria-label="breadcrumb"] [aria-current="page"]').click();
    cy.scrollTo("bottom");
    cy.get('[data-cy="link-to-result"]').click();
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
    // not allowed to get into the page without accept cookies.
    //   cy.reload(true);
  });
});
