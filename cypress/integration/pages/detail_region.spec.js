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
    cy.acceptCookie();
    cy.wait(5000);
    cy.get('[id="Regional and Unspecified"]').click({ force: true });
    cy.get(".smTooltipContainer___StyledButton2-sc-1e6tvjb-7").click();
    cy.wait(1000);
    cy.get('[aria-label="Developing countries, unspecified"]').click({
      force: true,
    });
    cy.get(".smTooltipContainer___StyledButton-sc-1e6tvjb-6").click();
    cy.wait(5000);
  });

  it("should show the correct title", () => {
    regionPageTitle.forEach((text) =>
      cy.get("h3").contains(text).should("exist")
    );
  });

  it("check charts", () => {
    cy.checkCharts();
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
