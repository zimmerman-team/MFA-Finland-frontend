/// <reference types="cypress" />

const pageTitle = [
  "Priority areas",
  "Sectors",
  "Organisations",
  "Budget lines",
  "SDG - Sustainable Development Goals",
  "Map of country allocable development cooperation",
];

context("detail country page", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });
  it("go to the country page", () => {
    cy.acceptCookie();
    cy.waitLoader("locations-loader");
    cy.get('[id="South of Sahara"]').click({ force: true });
    cy.get('[data-cy="DrillDownButton"]').click();
    cy.wait(1000);
    cy.get('[id="MZ"]').click({ force: true });
    cy.get('[data-cy="GotoDetailButton"]').click();
    cy.wait(5000);
    cy.get("h2").contains("Mozambique");
  });

  // it("should show the correct title", () => {
  //   pageTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  // });

  it("check charts", () => {
    cy.checkCharts();
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
