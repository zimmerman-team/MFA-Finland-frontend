/// <reference types="cypress" />

const years = ["2021", "2020", "2019", "2018", "2017"];

const budgets = [
  "Multilateral development cooperation",
  "Country-specific and regional development",
  "Humanitarian assistance",
  "European Development Fund",
];

context("viz module page budget", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module org page", () => {
    cy.visit("localhost:3000/en");
    cy.get("h3").contains("Budget lines").click();
  });

  // it("check chart and hover", () => {
  //   cy.waitLoader("budgetlines-loader");
  //   cy.get("#viz-scroller").should("exist");
  //   cy.get('[data-cy="bf-barchart-bar-comp"]')
  //     .eq(18)
  //     .then(($bar) => {
  //       cy.wrap($bar).click();
  //     });
  //   cy.get('[data-cy="legend-items-space"]').should("be.visible");
  //   budgets.forEach((text) => {
  //     cy.get("[data-cy^=sub-legend-items-]").contains(text);
  //   });
  // });

  it("check right coordinate", () => {
    years.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
  });

  it("the tooltip show correctly", () => {
    cy.checkTooltip();
  });

  it("CSV file", () => {
    cy.checkCSV("budget-lines.csv", 11100);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });

  it("change to table display", () => {
    cy.get('[data-cy="filled-button-Table"]').click({ force: true });
    cy.get("h6").contains("budget line");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    years.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("table show the correct content", () => {
    cy.get('[data-testid="MUIDataTableBodyRow-0"] button').click();
    cy.get("td").contains("Support").should("be.visible");
  });
});
