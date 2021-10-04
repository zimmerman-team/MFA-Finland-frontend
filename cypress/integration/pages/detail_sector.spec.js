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
    cy.acceptCookie();
    cy.get("._StyledDiv4-ggjYTm").contains("Government").click();
    cy.get(".smTooltipContainer___StyledButton-sc-1e6tvjb-6")
      .contains("Sector")
      .click({ force: true });
  });

  it("should show the correct title", () => {
    sectorPageTitle.forEach((text) =>
      cy.get("h3").contains(text).should("exist")
    );
  });

  it("check charts", () => {
    cy.checkCharts();
  });

  it("sector should be only one sector", () => {
    cy.scrollTo(200);
    // cy.get("._StyledDiv-kdVnjk").should("exist");
    cy.get("._StyledDiv4-ggjYTm").contains("100%");
  });

  it("Regions", () => {
    cy.checkRegion("Regional and Unspecified");
  });

  it("Orgnisations", () => {
    cy.checkOrganisation("Multilateral Organisations");
  });

  it("Sector info", () => {
    cy.get("._StyledDiv5-iiwrxn").contains("support");
  });

  it("SDG", () => {
    cy.checkSDG("1", "Goal 1. End poverty in all its forms everywhere");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
  });
});
