/// <reference types="cypress" />

const pageTitle = [
  "Thematic area",
  "Sectors",
  "regions",
  "Organisations",
  "Budget lines",
  "SDG - Sustainable Development Goals",
  "Map of country allocable development cooperation",
];

context("detail org page", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the org page", () => {
    cy.acceptCookie();
    cy.waitLoader("orgs-loader");
    cy.get(
      '[aria-label="Non-Governmental Organisation (NGO) and Civil Society"]'
    ).click({ force: true });
    cy.get('[data-cy="GotoDetailButton"]').click();
    cy.wait(5000);
  });

  it("should show the correct org name", () => {
    cy.get("h2").contains(
      "Non-Governmental Organisation (NGO) and Civil Society"
    );
  });

  // it("should show the correct title", () => {
  //   pageTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  // });

  it("check charts", () => {
    cy.wait(5000);
    cy.checkCharts();
  });

  it("Regions", () => {
    cy.checkRegion("Regional and Unspecified");
  });

  it("Orgnisations", () => {
    cy.checkOrganisation(
      "Non-Governmental Organisation (NGO) and Civil Society"
    );
  });

  it("SDG", () => {
    cy.checkSDG("1", "Goal 1. End poverty in all its forms everywhere");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
  });
});
