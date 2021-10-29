/// <reference types="cypress" />
import "../../support/commands";

context("search", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("accept cookies", () => {
    cy.acceptCookie();
  });

  it("search activity by word", () => {
    cy.search("networking");
    cy.get('[data-cy="search-nav-item-0"]').click();
    cy.searchContains('[data-cy="project-detail-title"]', "Networking");
  });

  it("search activity by full title", () => {
    cy.search("Support for UNESCO's Global Education Monitoring Report");
    cy.searchContains(
      '[data-cy="project-detail-title"]',
      "Support for UNESCO's Global Education Monitoring Report"
    );
  });

  it("search activity by half title", () => {
    cy.search("human mine");
    cy.searchContains('[data-cy="project-detail-title"]', "humanitarian mine");
  });

  it("search organistion by word", () => {
    cy.search("halo");
    cy.get('[data-cy="search-nav-item-3"]').click();
    cy.wait(2000);
    cy.get('[data-cy="search-result-item-1"]').click();
    cy.get("h2").contains("HALO");
  });

  it("search sector by word", () => {
    cy.search("building");
    cy.get('[data-cy="search-nav-item-2"]').click();
    cy.searchContains("h2", "building");
  });

  it("search country by word", () => {
    cy.search("Nepal");
    cy.get('[data-cy="search-nav-item-4"]').click();
    cy.searchContains("h2", "Nepal");
  });

  it("go to project lists", () => {
    cy.search("report");
    cy.get('[data-cy="search-nav-item-0"]').click();
    cy.get("a").contains("Go to projects list").click();
    cy.get("h6").contains("activities");
  });
});
