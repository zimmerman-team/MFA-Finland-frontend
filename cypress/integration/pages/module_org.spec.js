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
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();

    cy.get("h3").contains("Organisations").click();
  });

  it("check chart and hover", () => {
    cy.wait(5000);
    cy.get(".treemap___StyledDiv3-dnl4if-3").should("exist");
    //TODO: maybe can refactor with the detail page function check region
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
      cy.get("._StyledDiv-hfFXsB").contains(text);
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
    cy.get("._StyledButton-gQDzsd").eq(1).click({ force: true });
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
    cy.get("._StyledButton-gQDzsd").eq(0).click({ force: true });
    cy.get(
      '[aria-label="Non-Governmental Organisation (NGO) and Civil Society"]'
    ).click({ force: true });
    cy.wait(3000);
    NGOorgs.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
    });
    cy.get('[aria-label="International NGO"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("International NGO");
    // cy.get('.node___StyledDiv-t9xrnj-0 >:nth-child(3)').click()
  });
});
