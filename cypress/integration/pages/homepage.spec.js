/// <reference types="cypress" />

const homeTitle = [
  "Overview Disbursements",
  "Thematic area",
  "Sectors",
  "Regions",
  "Organisations",
  "Budget lines",
  "About the site",
  "SDG - Sustainable Development Goals",
  "Result",
  "Map of country allocable development cooperation",
];

context("Homepage", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("go to homepage", () => {
    cy.visit("localhost:3000");
    cy.wait(20000);
    cy.get('[test-id="main-page-accept"]').click();
  });

  it("shouls show the correct title", () => {
    homeTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  });

  it("Overview Disbursements", () => {
    cy.get("._StyledDiv4-jwxTbH").should("exist");
    cy.get("._StyledDiv4-jwxTbH").click({ force: true });
    cy.visit("localhost:3000");
    cy.wait(20000);
  });

  it("Thematic areas and Sectors", () => {
    cy.get("._StyledGrid2-jcxLZB").should("exist");

    // Sectors
    cy.scrollTo(200);
    cy.get("._StyledDiv-kdVnjk").should("exist");
  });

  it("Regions", () => {
    // Regions-hover
    cy.get('[id="Regional and Unspecified"]').trigger("mouseover", {
      force: true,
    });
    cy.get(".treemap___StyledDiv-dnl4if-0").should("be.visible");
    // Regions-click
    cy.get('[id="Regional and Unspecified"]').click({ force: true });
    cy.get("b").contains("Regional and Unspecified").should("exist");
    cy.get(".clgFzd").click();
  });

  it("Orgnisations", () => {
    //hover
    cy.get('[aria-label="Multilateral Organisations"]').click({ force: true });
    cy.get(".treemap___StyledDiv-dnl4if-0").should("be.visible");
    //click
    cy.get('[aria-label="Multilateral Organisations"]').click({ force: true });
    cy.get("b").contains("Multilateral Organisations").should("exist");
    cy.get(".clgFzd").click();
  });

  it("Budget lines", () => {
    cy.get("._StyledDiv2-kDlTqH").should("exist");
  });

  it("About the site", () => {
    cy.get("._StyledDiv5-iiwrxn").contains(
      "Openaid.fi is databank on Finland’s development cooperation."
    );
  });

  it("SDG", () => {
    //hover
    cy.get(
      '[aria-label="SDG: 1 - Goal 1. End poverty in all its forms everywhere"]'
    ).trigger("mouseover", { force: true });
    cy.get("b").contains("all its forms").should("be.visible");
  });

  it("Result content", () => {
    cy.get(".GridWidget___StyledDiv12-sc-1fjyyq1-17").contains(
      "Positive results build societies and contribute to global stability and wellbeing."
    );
  });

  it("Map content should work", () => {
    // tooltip in right side
    cy.get(
      '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
    ).click();
    cy.get(
      '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
    ).click();
    cy.get(".Collapseable___StyledDiv2-sc-18do71n-3").should("be.visible");

    //Disbursements amount
    cy.get(".Legend___StyledDiv2-sc-12zjtsg-2").should("exist");
  });

  it("Footer and Header", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();
    // not allowed to get into the page without accept cookies.
    //   cy.reload(true);
  });
});
