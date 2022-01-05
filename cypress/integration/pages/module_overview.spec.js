/// <reference types="cypress" />

context("viz module page overview", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module overview page", () => {
    cy.visit("localhost:3000/en");
    cy.waitLoader("oda-loader");
    cy.get("#viz-scroller").eq(0).click({ force: true });
  });

  it("check chart", () => {
    cy.waitLoader("oda-loader");
    cy.get('[id="viz-oda"]').should("exist");
  });

  it("expand 2018 ODA", () => {
    cy.get('[data-cy="sub-legend-items-2018 Total ODA"] svg').click();
    cy.get("g circle");
    cy.get("[data-cy^=sub-legend-items-]").contains("Exclusive ODA");
    cy.get("[data-cy^=sub-legend-items-]").contains("Other ODA");
  });

  it("check the tooltip", () => {
    cy.checkTooltip();
  });
  it("CSV file", () => {
    cy.checkCSV("oda.csv", 900);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });
});
