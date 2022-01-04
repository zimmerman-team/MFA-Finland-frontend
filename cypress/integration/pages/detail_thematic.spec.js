/// <reference types="cypress" />

const pageTitle = [
  "Thematic area",
  "Sectors",
  "Regions",
  "Organisations",
  "Budget lines",
  "SDG - Sustainable Development Goals",
  "Map of country allocable development cooperation",
];

context("detail thematic area page", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the thematic area page", () => {
    cy.visit("localhost:3000");
    cy.waitLoader("thematic-loader");
    cy.get('[data-cy="viz-pie-Thematic area A"]').click({ force: true });
    cy.wait(5000);
  });

  it("should show the correct org name", () => {
    cy.get("h2").contains(
      "Strengthening the status and rights of women and girls"
    );
  });

  // it("should show the correct title", () => {
  //   pageTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  // });

  it("check charts", () => {
    cy.waitLoader("oda-loader");
    cy.get("#viz-scroller").should("exist");
    // Sectors
    cy.waitLoader("sectors-loader");
    cy.get(".rv-xy-plot__inner").should("exist");

    cy.checkMapContent();

    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("chech thematic area", () => {
    cy.get('[data-cy="priority-area-pie-simple"]').should("exist");
    cy.get("g text").contains("Main priority");
  });

  // it("Regions", () => {
  //   cy.checkRegion("Regional and Unspecified");
  // });

  // it("Orgnisations", () => {
  //   cy.checkOrganisation("Multilateral Organisations");
  // });

  it("SDG", () => {
    cy.checkSDG("1", "Goal 1. End poverty in all its forms everywhere");
  });
});
