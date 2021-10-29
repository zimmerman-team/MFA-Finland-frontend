/// <reference types="cypress" />

const feedbackTest = ["Feedback"];

context("Feedback", () => {
  it("should show correct title", () => {
    cy.acceptCookie();
    cy.visit("localhost:3000/feedback");
    feedbackTest.forEach((text) => cy.get("h2").contains(text).should("exist"));
  });

  it("inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    feedbackTest.forEach((text) => cy.contains(text).click());
    cy.get(".InPageNavigation___StyledArrowUpwardIcon-sc-1nr5zk8-2").click();
    cy.get(".InPageNavigation___StyledArrowDownwardIcon-sc-1nr5zk8-1").click();
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get("._StyledNavLink-cajSdB").click();
    cy.scrollTo("bottom");
    cy.get(".Footer___StyledNavLink-sc-93h9it-7").click();
  });

  // it("cy.reload() - reload the page", () => {
  //   cy.reload();
  //   // not allowed to get into the page without accept cookies.
  //   //   cy.reload(true);
  // });
});
