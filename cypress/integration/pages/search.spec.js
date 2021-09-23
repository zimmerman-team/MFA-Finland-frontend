/// <reference types="cypress" />
import "../../support/commands";

context("search", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("accept cookies", () => {
    cy.acceptCookie();
    // cy.visit("localhost:3000");
    // cy.wait(10000);
    // cy.get('[test-id="main-page-accept"]').click();
  });

  it("search activity by word", () => {
    cy.get('[aria-label="Search in application"]').click().type("networking");
    cy.wait(5000);

    cy.get('[data-cy="search-result-navigation"]').should("be.visible");
    cy.get('[data-cy="search-result-item-0"]').click();

    cy.wait(2000);
    cy.get(".MuiTypography-body1").contains("networking");
  });

  it("search activity by full title", () => {
    cy.get('[aria-label="Search in application"]')
      .click()
      .type("Support for UNESCO's Global Education Monitoring Report");
    cy.wait(5000);

    cy.get('[data-cy="search-result-navigation"]').should("be.visible");
    cy.get('[data-cy="search-nav-item-0"]').click();
    cy.get('[data-cy="search-result-item-0"]').click();

    cy.wait(2000);
    cy.get(".MuiTypography-body1").contains(
      "Support for UNESCO's Global Education Monitoring Report"
    );
  });

  it("search activity by half title", () => {
    cy.get('[aria-label="Search in application"]').click().type("human mine");
    cy.wait(5000);

    cy.get('[data-cy="search-result-navigation"]').should("be.visible");
    cy.get('[data-cy="search-result-item-0"]').click();

    cy.wait(2000);
    cy.get(".MuiTypography-body1").contains("humanitarian mine");
  });

  it("cy.reload() - reload the page", () => {
    cy.acceptCookie();
    cy.reload();
  });
});
