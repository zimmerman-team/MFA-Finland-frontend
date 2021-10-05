/// <reference types="cypress" />

context("Accessibility statement", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("should show correct title", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/statements");
    cy.get("h2").contains("Accessibility statement").should("exist");
  });

  it("inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    cy.contains("Accessibility statement").click();
    cy.get(".InPageNavigation___StyledArrowUpwardIcon-sc-1nr5zk8-2").click();
    cy.get(".InPageNavigation___StyledArrowDownwardIcon-sc-1nr5zk8-1").click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get("._StyledNavLink-kabrGe").click();
    cy.scrollTo("bottom");
    cy.get(".Footer___StyledNavLink4-sc-93h9it-10").click();
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
  });
});
