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
    cy.acceptCookie();
    cy.get("h3").contains("Budget lines").click();
  });

  it("check chart and hover", () => {
    cy.wait(5000);
    cy.get("._StyledDiv2-kDlTqH").should("exist");
    cy.get("._StyledGrid-fwVrLc").should("be.hidden");
    cy.get('[data-cy="bf-barchart-bar-comp"]').eq(18).click();
    cy.get("._StyledGrid-fwVrLc").should("be.visible");
    budgets.forEach((text) => {
      cy.get("._StyledGrid-fwVrLc").contains(text);
    });
  });

  it("check right coordinate", () => {
    years.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
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
    cy.get("._StyledButton-gQDzsd").eq(1).click({ force: true });
    cy.get("h6").contains("budget line");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    years.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("table show the correct content", () => {
    cy.get('[id="expandable-button"]').eq(1).click();
    cy.get("td").contains("Support").should("be.visible");
  });
});
