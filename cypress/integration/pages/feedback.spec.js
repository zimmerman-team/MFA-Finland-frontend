/// <reference types="cypress" />

const feedbackTest = ["Feedback", "FAQ's"];

context("Feedback", () => {
  it("should show correct title", () => {
    cy.viewport(1536, 860);
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/feedback");
    feedbackTest.forEach((text) => cy.get("h2").contains(text).should("exist"));
  });

  it("inpage navigation", () => {
    cy.viewport(1536, 860);
    cy.get('[data-cy="in-page-nav"]').should("exist");
    feedbackTest.forEach((text) => cy.contains(text).click());
    cy.get('[data-cy="arrow-down-button"]').click();
    cy.get('[data-cy="arrow-up-button"]').click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.viewport(1536, 860);
    cy.get('[aria-label="breadcrumb"] [aria-current="page"]').click();
    cy.scrollTo("bottom");
    cy.get('[data-cy="link-to-feedback"]').click();
  });

  it("cy.reload() - reload the page", () => {
    cy.viewport(1536, 860);
    cy.reload();
    // not allowed to get into the page without accept cookies.
    //   cy.reload(true);
  });
});
