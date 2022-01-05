/// <reference types="cypress" />

const coordinate = [
  "Strengthening the status and rights of women and girls",
  "Education, well-functioning societies and democracy",
  "Climate change and natural resources",
  "Strengthening the economic base of developing countries and creating jobs",
];

context("viz module page thematic", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the viz thematic area page", () => {
    cy.visit("localhost:3000/en");
    cy.get("h3").contains("Priorities").click();
  });

  it("check charts", () => {
    cy.waitLoader("thematic-loader");
    cy.get('[data-cy="viz-pie-chart"]').should("exist");
  });

  it("check chart coordinate", () => {
    coordinate.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
  });

  it("check detail info", () => {
    coordinate.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
  });
  it("check tooltip", () => {
    cy.checkTooltip();
  });

  it("CSV file", () => {
    cy.checkCSV("thematic-areas.csv", 590);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });

  it("change to table display", () => {
    cy.get('[data-cy="filled-button-Table"]').click({ force: true });
    cy.get("h6").contains("priorities");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    coordinate.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("search show the correct result", () => {
    cy.get('[aria-label="Search"]').click();
    cy.get('[aria-label="Search"]').eq(0).click().type("st");
    cy.get("td").should("have.length", 5);
  });
});
