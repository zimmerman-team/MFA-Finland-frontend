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

  it("go to the org page", () => {
    cy.acceptCookie();
    cy.wait(5000);
    cy.get(".ctlqna").click({ force: true });
    // cy.get('.smTooltipContainer___StyledButton-sc-1e6tvjb-6').click();
    cy.wait(5000);
  });

  it("should show the correct org name", () => {
    cy.get("h2").contains("Priority area 2");
  });

  it("should show the correct title", () => {
    pageTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  });

  it("check charts", () => {
    cy.wait(5000);
    cy.get("._StyledDiv4-jwxTbH").should("exist");
    // Sectors
    cy.get("._StyledDiv-kdVnjk").should("exist");

    cy.checkBudgetLine();
    cy.checkMapContent();

    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("chech thematic area", () => {
    cy.get("._StyledGrid-fmVJvG").should("exist");
    cy.get("g text").contains("Main priority");
  });

  it("Regions", () => {
    cy.checkRegion("Regional and Unspecified");
  });

  it("Orgnisations", () => {
    cy.checkOrganisation("Multilateral Organisations");
  });

  it("SDG", () => {
    cy.checkSDG("1", "Goal 1. End poverty in all its forms everywhere");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
  });
});
