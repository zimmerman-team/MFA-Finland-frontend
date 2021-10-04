/// <reference types="cypress" />

import path from "path";
import validateImage from "../../plugins/index";

const validateCsvList = (list) => {
  expect(list, "thematic-areas").to.have.length.gt(600);
};
const downloadsFolder = Cypress.config("downloadsFolder");
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
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();

    cy.get("h3").contains("Thematic areas").click();
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
  it("should download the correct file", () => {
    cy.get(".FloatingButtons___StyledMoreHoriz-j96bs6-3").click();
    cy.get(".FloatingButtons___StyledShare-j96bs6-5").trigger("mouseover", {
      force: true,
    });
    cy.get(".MuiTooltip-popper").should("be.visible");
    cy.get(".FloatingButtons___StyledCloudDownload-j96bs6-7").click();
  });

  it("CSV file", () => {
    cy.get('[id="download-csv"]').click();
    cy.log("**read downloaded file**");
    const filename = path.join(downloadsFolder, "thematic-areas.csv");
    cy.readFile(filename, { timeout: 15000 })
      .should("have.length.gt", 20)
      .then(validateCsvList);
  });

  it("PNG image", () => {
    // image comes from a domain different from the page
    cy.get(".FloatingButtons___StyledTypography3-j96bs6-11").click({
      force: true,
    });
    cy.log("**confirm downloaded image**");
    validateImage();
  });

  it("change to table display", () => {
    cy.get("._StyledButton-gQDzsd").eq(1).click({ force: true });
    cy.get("h6").contains("thematic areas");
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
