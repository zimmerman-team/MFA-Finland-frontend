/// <reference types="cypress" />

const sectorPageTitle = [
  "Thematic area",
  "Sectors",
  "Regions",
  "Organisations",
  "Budget lines",
  "Sector info",
  "SDG - Sustainable Development Goals",
  "Map of country allocable development cooperation",
];

context("detail sector page", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the sector page", () => {
    cy.visit("localhost:3000/en/sectors/11220");
    cy.wait(1000);
    cy.get("h2").contains("Primary education");
  });

  // it("should show the correct title", () => {
  //   sectorPageTitle.forEach((text) =>
  //     cy.get("h3").contains(text).should("exist")
  //   );
  // });

  it("check charts", () => {
    cy.checkCharts();
  });

  it("sector should be only one sector", () => {
    cy.scrollTo(200);
    cy.get("._StyledDiv4-ggjYTm").contains("100%");
  });

  // it("Regions", () => {
  //   cy.checkRegion("Regional and Unspecified");
  // });

  // it("Organisations", () => {
  //   cy.checkOrganisation("Multilateral Organisations");
  // });

  it("Sector info", () => {
    cy.get("._StyledDiv5-iiwrxn").contains(
      "Formal and non-formal primary education for children"
    );
  });

  it("SDG", () => {
    cy.checkSDG("1", "Goal 1. End poverty in all its forms everywhere");
  });
});
