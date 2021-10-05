/// <reference types="cypress" />

context("viz module page overview", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module overview page", () => {
    cy.acceptCookie();
    cy.get('[id="viz-scroller"]').eq(0).click({ force: true });
  });

  it("check chart", () => {
    cy.wait(8000);
    cy.get("._StyledDiv5-imxKnE").should("exist");
  });

  it("expand 2018 ODA", () => {
    cy.get("._StyledArrowDropDown-ilkZlG").eq(3).click();
    cy.get("g circle");
    cy.get("._StyledGrid-fwVrLc").contains("Exclusive ODA");
    cy.get("._StyledGrid-fwVrLc").contains("Other ODA");
    cy.get("._StyledGrid-fwVrLc").contains("ODA/GNI");
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
