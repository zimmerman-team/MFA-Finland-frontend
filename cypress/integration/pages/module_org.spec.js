/// <reference types="cypress" />

const orgs = [
  "Multilateral Organisations",
  "Non-Governmental Organisation (NGO) and Civil Society",
  "Public Sector Institutions",
  "Private Sector Institutions",
  "Others",
];

const NGOorgs = [
  "Donor country-based NGO",
  "International NGO",
  "Developing country-based NGO",
];

context("viz module page organisation", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module org page", () => {
    cy.acceptCookie();
    cy.get("h3").contains("Organisations").click();
  });

  it("check chart and hover", () => {
    cy.wait(5000);
    cy.get("#treemap").should("exist");
    cy.get(
      '[aria-label="Non-Governmental Organisation (NGO) and Civil Society"]'
    ).trigger("mouseover", {
      force: true,
    });
    cy.get("b")
      .contains("Non-Governmental Organisation (NGO) and Civil Society")
      .should("exist");

    cy.get('[aria-label="Public Sector Institutions"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Public Sector Institutions").should("exist");
  });

  it("check right coordinate", () => {
    orgs.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
  });

  it("the tooltip show correctly", () => {
    cy.checkTooltip();
  });

  it("CSV file", () => {
    cy.checkCSV("organisations.csv", 1610);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });

  it("change to table display", () => {
    cy.get('[data-cy="filled-button-Table"]').click({ force: true });
    cy.get("h6").contains("organisation");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    orgs.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("search show the correct result", () => {
    cy.get('[aria-label="Search"]').click();
    cy.get('[aria-label="Search"]').eq(0).click().type("oth");
    cy.get("td").should("have.length", 8);
    cy.get("td").contains("Others");
    cy.get('[id="expandable-button"]').eq(1).click();
    cy.get("td")
      .contains("Other multilateral institutions")
      .should("be.visible");
  });

  it("check deep chart click", () => {
    cy.viewport(1536, 860);
    cy.get('[data-cy="filled-button-Chart"]').click({ force: true });
    cy.get(
      '[aria-label="Non-Governmental Organisation (NGO) and Civil Society"]'
    ).click({ force: true });
    cy.wait(3000);
    NGOorgs.forEach((text) => {
      cy.get("[data-cy^=sub-legend-items-]").contains(text);
    });
    cy.get('[aria-label="International NGO"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("International NGO");
  });
});
