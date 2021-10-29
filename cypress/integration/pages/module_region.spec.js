/// <reference types="cypress" />

const regions = [
  "Regional and Unspecified",
  "South of Sahara",
  "South & Central Asia",
  "Middle East",
  "Far East Asia",
  "Europe",
  "South America",
];

const asiaCountries = [
  "Afghanistan",
  "Nepal",
  "Myanmar",
  "India",
  "Kyrgyzstan",
];

context("viz module page country and region", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module region page", () => {
    cy.acceptCookie();
    cy.get("h3").contains("regions").click();
  });

  it("check chart and hover", () => {
    cy.waitLoader("locations-loader");
    cy.get("#treemap").should("exist");
    cy.get('[aria-label="Regional and Unspecified"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Regional and Unspecified").should("exist");

    cy.get('[aria-label="South & Central Asia"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("South & Central Asia").should("exist");
  });

  it("check right coordinate", () => {
    regions.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
  });

  it("the tooltip show correctly", () => {
    cy.checkTooltip();
  });

  it("CSV file", () => {
    cy.checkCSV("countries-regions.csv", 5400);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });

  it("change to table display", () => {
    cy.get('[data-cy="filled-button-Table"]').click({ force: true });
    cy.get("h6").contains("countries and regions");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    regions.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("search show the correct result", () => {
    cy.get('[aria-label="Search"]').click();
    cy.get('[aria-label="Search"]').eq(0).click().type("mid");
    cy.get("td").should("have.length", 4);
    cy.get("td").contains("Middle East");
    cy.get('[id="expandable-button"]').eq(1).click();
    cy.get("td").contains("Syrian Arab Republic").should("be.visible");
  });

  it("check deep chart click", () => {
    cy.viewport(1536, 860);
    cy.get('[data-cy="filled-button-Chart"]').click({ force: true });
    cy.get('[aria-label="South & Central Asia"]').click({ force: true });
    cy.waitLoader("locations-loader");
    asiaCountries.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
    cy.get('[aria-label="Myanmar"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Myanmar");
    // cy.get('.node___StyledDiv-t9xrnj-0 >:nth-child(3)').click()
  });
});
