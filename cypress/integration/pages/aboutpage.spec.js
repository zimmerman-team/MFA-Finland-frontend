/// <reference types="cypress" />

const aboutTest = ["About", "Privacy", "Cookie policy"];

context("About", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("should show correct title", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/about");
    aboutTest.forEach((text) => cy.get("h2").contains(text).should("exist"));
  });

  it("inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    aboutTest.forEach((text) => cy.contains(text).click());
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get("._StyledNavLink-kabrGe").click();
  });

  it("cy.reload() - reload the page", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/about");
    cy.reload();
    // reload the page without using the cache
    // cy.reload(true);
  });
});
