/// <reference types="cypress" />
const title = ["Description", "Project disbursements for year", "Disbursement"];
const accodionTitle = [
  "Participating organisations",
  "Activity summary",
  "Countries",
  "Regions",
  "Sector",
  "Type of aid",
  "Policy Markers",
];
const number = [0, 1, 2, 3, 4, 5, 6];

context("Project detail", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to the project page", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/viz/projects");
    cy.get("h6").contains("activities");
  });

  it("go to the project detail page", () => {
    cy.get('[id="image-container"] a').eq(0).click();
  });

  it("should have the correct title", () => {
    cy.get('[data-cy="project-detail-title"]').contains(
      "Consolidating Institutional Capacities for National Surface Water Quality Monitoring in the Kyrgyz Republic FinWaterWEI III"
    );
    title.forEach((text) => {
      cy.get(".MuiTypography-body1").contains(text);
    });
  });

  it("project disbursements progress bar", () => {
    cy.get('[data-cy="disbursement-bar"]').should("exist");
  });

  it("transcation hover", () => {
    cy.get("g rect").eq(0).trigger("mouseover", { force: true });
    cy.get('[id="treemap-tooltip"]').should("be.visible");
  });

  it("transcation table", () => {
    cy.get('[data-cy="PillButton-table"]').click();
    cy.get("table").contains("disbursements");
    cy.get('[data-cy="PillButton-chart"]').click();
  });

  it("Accordion show correct title", () => {
    accodionTitle.forEach((text) => {
      cy.get(".MuiAccordionSummary-content p").contains(text);
    });
  });

  it("Accordion should expand smoothly", () => {
    number.forEach((num) => {
      cy.get('[data-cy="expandmore-icon"]').eq(num).click();
      cy.get('[data-cy="accordion-detail"]').should("be.visible");
      cy.get('[data-cy="expandless-icon"]').click();
      cy.get('[data-cy="accordion-detail"]').should("be.hidden");
    });
  });

  it("Inpage navigation", () => {
    cy.get('[data-cy="in-page-nav"]').should("exist");
    accodionTitle.forEach((text) => {
      cy.get('[data-cy="in-page-nav"]').contains(text);
    });

    cy.get('[data-cy="arrow-down-button"]').click();
    cy.get('[data-cy="nav-active"]').should("be.visible");
    cy.get('[data-cy="arrow-up-button"]').click();
  });
});
