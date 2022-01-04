/// <reference types="cypress" />

const regionPageTitle = [
  "Thematic area",
  "Sectors",
  "Organisations",
  "Budget lines",
  "SDG - Sustainable Development Goals",
  "Map of country allocable development cooperation",
];

context("detail region page", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the region page", () => {
    cy.visit("localhost:3000/en/regions/998");
    cy.wait(1000);
    cy.get("h2").contains("Developing countries, unspecified");
  });

  // it("should show the correct title", () => {
  //   regionPageTitle.forEach((text) =>
  //     cy.get("h3").contains(text).should("exist")
  //   );
  // });

  it("check charts", () => {
    cy.checkCharts();
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
