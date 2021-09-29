/// <reference types="cypress" />
const title = ["Description", "Project disbursements for year", "Transactions"];
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
    cy.get("h6").contains("projects");
  });

  it("go to the project detail page", () => {
    cy.get(".projects___StyledDiv4-sc-1bi33pa-6 a").eq(0).click();
  });

  it("should have the correct title", () => {
    cy.get("._StyledTypography2-fNTwbf").contains(
      "OYO Gentlemen and Supergirls - Addressing GBV with teenagers in Ohangwena and Omusati"
    );
    title.map((text) => {
      cy.get(".MuiTypography-body1").contains(text);
    });
  });

  it("project disbursements progress bar", () => {
    cy.get(".Disbursements___StyledDiv-agjdzy-0").should("exist");
  });

  it("transcation hover", () => {
    cy.get("g rect").eq(0).trigger("mouseover", { force: true });
    cy.get('[id="treemap-tooltip"]').should("be.visible");
  });

  it("transcation table", () => {
    cy.get(".PillButton___StyledButton-faslku-0").contains("Table").click();
    cy.get("table").contains("Disbursements");
    cy.get(".PillButton___StyledButton-faslku-0").contains("Chart").click();
  });

  it("Accordion show correct title", () => {
    accodionTitle.map((text) => {
      cy.get(".MuiAccordionSummary-content p").contains(text);
    });
  });

  it("Accordion should expand smoothly", () => {
    number.map((num) => {
      cy.get("._StyledExpandMoreIcon-ldWMvY").eq(num).click();
      cy.get("._StyledMUIAccordionDetails-eBIbjj").should("be.visible");
      cy.get("._StyledExpandLessIcon-fnJIsc").click();
      cy.get("._StyledMUIAccordionDetails-eBIbjj").should("be.hidden");
    });
  });

  it("Inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    accodionTitle.map((text) => {
      cy.get("._StyledDiv2-Rvwug").contains(text);
    });

    cy.get(".InPageNavigation___StyledArrowDownwardIcon-sc-1nr5zk8-1").click();
    cy.get(".bsiwwe").should("be.visible");
    cy.get(".InPageNavigation___StyledArrowUpwardIcon-sc-1nr5zk8-2").click();
  });
});
