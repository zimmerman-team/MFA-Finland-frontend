/// <reference types="cypress" />

context("Result", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("should show correct title", () => {
    cy.acceptCookie();
    cy.visit("localhost:3000/result");
    cy.get("h2").contains("Development cooperation results").should("exist");
  });

  it("inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    cy.contains("Development cooperation results").click();
    cy.get(".InPageNavigation___StyledArrowUpwardIcon-sc-1nr5zk8-2").click();
    cy.get(".InPageNavigation___StyledArrowDownwardIcon-sc-1nr5zk8-1").click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get("._StyledNavLink-kabrGe").click();
    cy.scrollTo("bottom");
    cy.get(".Footer___StyledNavLink3-sc-93h9it-9").click();
  });

  // it("cy.reload() - reload the page", () => {
  //   cy.reload();
  //   // not allowed to get into the page without accept cookies.
  //   //   cy.reload(true);
  // });
});
