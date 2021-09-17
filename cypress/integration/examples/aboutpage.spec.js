/// <reference types="cypress" />

const aboutTest = ["About", "Privacy", "Cookie policy"];

context("About", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
    cy.visit("localhost:3000");
    cy.get('[test-id="main-page-accept"]').click();
    cy.visit("localhost:3000/about");
  });

  it("should show correct title", () => {
    aboutTest.map((text) => cy.get("h2").contains(text).should("exist"));
  });

  it("inpage navigation", () => {
    cy.get(".InPageNavigation___StyledDiv-sc-1nr5zk8-0").should("exist");
    aboutTest.map((text) => cy.contains(text).click());
  });

  it("go to homepage via breadcrumbs", () => {
    cy.get("._StyledNavLink-kabrGe").click();
    cy.visit("localhost:3000/");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
    // reload the page without using the cache
    cy.reload(true);
  });
});
