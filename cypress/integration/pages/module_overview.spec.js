/// <reference types="cypress" />
import path from "path";
import { validateImage, downloadsFolder } from "../../plugins/index";

const validateCsvList = (list) => {
  expect(list, "oda").to.have.length.gt(900);
};
const downloadsFolder = Cypress.config("downloadsFolder");

context("viz module page overview", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the module overview page", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();

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

  it("should download the correct file", () => {
    cy.get(".FloatingButtons___StyledMoreHoriz-j96bs6-3").click();
    cy.get(".FloatingButtons___StyledCloudDownload-j96bs6-7").click();
  });
  it("CSV file", () => {
    cy.get('[id="download-csv"]').click();
    cy.log("**read downloaded file**");
    const filename = path.join(downloadsFolder, "oda.csv");
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
});
