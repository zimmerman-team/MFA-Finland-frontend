/// <reference types="cypress" />

const homeTitle = [
  "Priority area",
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
    cy.wait(8000);
    cy.get('[test-id="main-page-accept"]').click();
  });

  // comment out for now cause this will probably fail randomly
  // as the text for the titles come from the CMS.
  // TODO: integrate CMS API calls to get the correct texts every time
  // it("shouls show the correct title", () => {
  //   homeTitle.forEach((text) => cy.get("h3").contains(text).should("exist"));
  // });

  it("Overview Disbursements", () => {
    cy.waitLoader("oda-loader");
    cy.get('[id="viz-scroller"]').should("exist");
  });

  it("Thematic areas and Sectors", () => {
    cy.waitLoader("thematic-loader");
    cy.get('[data-cy="viz-pie-chart"]').should("exist");

    // Sectors
    cy.scrollTo(200);
    cy.waitLoader("sectors-loader");
    cy.get(".rv-xy-plot__inner").should("exist");
  });

  it("Regions", () => {
    cy.waitLoader("locations-loader");
    // Regions-hover
    cy.get('[id="Regional and Unspecified"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Regional and Unspecified");
    // Regions-click
    cy.get('[id="Regional and Unspecified"]').click({ force: true });
    cy.get('[id="treemap-tooltip"]').should("exist");
    cy.get('[data-cy="CloseButton"]').click();
  });

  it("Orgnisations", () => {
    cy.waitLoader("orgs-loader");
    //hover
    cy.get('[aria-label="Multilateral Organisations"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Multilateral Organisations");
    //click
    cy.get('[aria-label="Multilateral Organisations"]').click({ force: true });
    cy.get('[id="treemap-tooltip"]').should("exist");
    cy.get('[data-cy="CloseButton"]').click();
  });

  it("Budget lines", () => {
    cy.waitLoader("budgetlines-loader");
    cy.get('[id="viz-scroller"]').eq(1).should("exist");
  });

  it("About the site", () => {
    cy.get('[data-cy="about"]').contains(
      "Openaid.fi is databank on Finland’s development cooperation."
    );
  });

  it("SDG", () => {
    cy.waitLoader("sdg-loader");
    //hover
    cy.get(
      '[aria-label="SDG: 1 - Goal 1. End poverty in all its forms everywhere"]'
    ).trigger("mouseover", { force: true });
    cy.get("b").contains("all its forms").should("be.visible");
  });

  it("Result content", () => {
    cy.get('[data-cy="result"]').contains(
      "Positive results build societies and contribute to global stability and wellbeing."
    );
  });

  it("Map content should work", () => {
    cy.waitLoader("geo-loader");
    // tooltip in right side
    cy.get(
      '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
    ).click();
    cy.get(
      '[aria-label="Collapse Geographically unallocable ODA visualisation"]'
    ).click();
    cy.get("h6").contains("Geographically unallocable ODA");

    //Disbursements amount
    cy.get("h6").contains("Aggregated disbursements");
  });

  it("Footer and Header", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  // it("cy.reload() - reload the page", () => {
  //   cy.reload();
  //   // not allowed to get into the page without accept cookies.
  //   //   cy.reload(true);
  // });
});
