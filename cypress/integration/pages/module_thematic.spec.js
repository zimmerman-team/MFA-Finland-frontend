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
    cy.acceptCookie();
    cy.get("h3").contains("Priority areas").click();
  });

  it("check charts", () => {
    cy.wait(8000);
    cy.get("._StyledGrid2-jcxLZB").should("exist");
  });

  it("check chart coordinate", () => {
    coordinate.forEach((text) => {
      cy.get("._StyledDiv6-kdYCbT").contains(text);
    });
  });

  it("check detail info", () => {
    coordinate.forEach((text) => {
      cy.get("._StyledDiv-hfFXsB").contains(text);
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
    cy.get("._StyledButton-gQDzsd").eq(1).click({ force: true });
    cy.get("h6").contains("priority areas");
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
