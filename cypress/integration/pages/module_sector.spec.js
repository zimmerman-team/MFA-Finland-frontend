/// <reference types="cypress" />

const sectors = [
  "Other aid",
  "Multi sector",
  "Humanitarian aid",
  "Government and civil society, general",
  "Productive sectors",
];
const governSector = [
  "Government and civil society, general",
  "Government & Civil Society-general",
  "Conflict prevention and resolution, peace and security",
];
const governDetailSector = [
  "Government & Civil Society-general",
  "Women’s rights organisations and movements, and government institutions",
  "Public sector policy and administrative management",
  "Human rights",
  "Democratic participation and civil society",
  "Ending violence against women and girls",
  "Legal and judicial development",
];

context("viz module page sectors", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the viz module sector page", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();

    cy.get("h3").contains("Sectors").click();
  });
  it("check charts", () => {
    cy.wait(5000);
    cy.get(".rv-xy-plot__inner").should("exist");
  });

  it("check chart hover", () => {
    cy.get(".rv-xy-plot__series--arc-path")
      .eq(1)
      .trigger("mouseover", { force: true });
    cy.get("b").contains("Education").should("exist");
  });

  it("check chart click", () => {
    cy.get('[pointer-events="all"] > :nth-child(3)').click();
    cy.wait(3000);
    governSector.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
    });
  });

  it("check chart deep click", () => {
    cy.get('[pointer-events="all"] > :nth-child(1)').click({ force: true });
    cy.wait(3000);
    governDetailSector.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
    });
    cy.get('[pointer-events="all"] > :nth-child(1)').click({ force: true });
    cy.wait(3000);
    cy.get("h2").contains("Government");
  });

  it("back to sector page", () => {
    cy.get(".MuiBreadcrumbs-li").contains("Homepage").click();
    cy.wait(10000);
    cy.get("h3").contains("Sectors").click();
  });

  it("check detail info", () => {
    cy.visit("http://localhost:3000/viz/sectors");
    cy.wait(8000);
    sectors.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
    });
  });
  it("the tooltip show correctly", () => {
    cy.checkTooltip();
  });

  it("CSV file", () => {
    cy.checkCSV("sectors.csv", 10000);
  });

  it("PNG image", () => {
    cy.checkPNG();
  });

  it("change to table display", () => {
    cy.get("._StyledButton-gQDzsd").eq(1).click({ force: true });
    cy.get("h6").contains("sectors");
    cy.get("table").should("exist");
  });

  it("table should have correct title", () => {
    sectors.forEach((text) => {
      cy.get("td").contains(text);
    });
  });

  it("search show the correct result", () => {
    cy.get('[aria-label="Search"]').click();
    cy.get('[aria-label="Search"]').eq(0).click().type("eco");
    cy.get("td").should("have.length", 20);
    cy.get("td").contains("Economic sectors");
    cy.get('[id="expandable-button"]').eq(1).click();
    cy.get("td").contains("Transport & Storage").should("be.visible");
  });
});
