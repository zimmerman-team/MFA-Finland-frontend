/// <reference types="cypress" />

context("Filter", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("accept cookie", () => {
    cy.visit("localhost:3000");
    cy.wait(10000);
    cy.get('[test-id="main-page-accept"]').click();
  });

  it("click add filter button", () => {
    cy.get('[data-cy="PillButton-Add Filters"]').click();
    cy.get("h3").contains("Countries and Regions");
    cy.get("h3").contains("SDG - Sustainable Development Goals");
  });

  it("Priority area show correct content", () => {
    cy.get('[data-cy="PillButton- Priority areas"]').click();
    cy.wait(1000);
    cy.get("h6").contains(
      "Strengthening the status and rights of women and girls"
    );
    cy.get("h6").contains(
      "Strengthening the economic base of developing countries and creating jobs"
    );
  });

  it("single select thematic area", () => {
    cy.get('[data-cy="PillButton-Add Filters"]').click();
    cy.get('[data-cy="PillButton- Priority areas"]').click();
    cy.get(".MuiAccordionSummary-expandIcon").eq(2).click();
    cy.get('[data-indeterminate="false"]').eq(8).check();

    // apply
    cy.get('[data-cy="PillButton-apply"]').click();

    // selection chip and disbursements
    cy.get(".MuiChip-label").contains(
      "Education, well-functioning societies and democracy - Main priority"
    );
    cy.get('[data-cy="homepage-overview disbursement"]').contains("mln");
    cy.wait(5000);
    cy.get('[data-cy="priority-area-pie-simple"]').should("exist");
    cy.get("g text").contains("Main priority");
  });

  it("cancel select", () => {
    // delete last selection
    cy.get(".MuiChip-deleteIcon").click({ force: true });
    // make sure get back to the main page
    cy.get('[data-cy="homepage-overview disbursement"]').contains("bln");
  });

  it("select both contries and sectors", () => {
    cy.get('[data-cy="PillButton-Add Filters"]')
      .contains("Add Filters")
      .click();
    cy.get('[data-cy="PillButton- Countries and Regions"]')
      .contains("Countries and Regions")
      .click();

    // check Europe
    cy.get('[data-indeterminate="false"]').eq(1).check();

    // check Egypt
    cy.get(".MuiAccordionSummary-expandIcon").eq(1).click();
    cy.get('[data-indeterminate="false"]').eq(15).check();

    // back iconbutton
    cy.get('[aria-label="back"]').click();

    cy.get('[data-cy="PillButton- Sectors"]').contains("Sectors").click();

    // check eduction sectore
    cy.get('[data-indeterminate="false"]').eq(1).check();

    // apply
    cy.get('[data-cy="PillButton-apply"]').click();
    cy.wait(8000);
  });

  it("then homepage should show the correct items", () => {
    // sectors cant work due to the cypress network
    // cy.get('._StyledSpan-dAExTZ').contains('Economic sectors');
    // cy.get('._StyledSpan2-eLKqDV').contains('100%');

    // regions
    cy.get('[aria-label="Europe"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Europe");
  });

  it("selection chip should show the correct items", () => {
    cy.get(".MuiChip-label")
      .contains("Countries/Regions")
      .click()
      .contains(
        "Albania; Belarus; Bosnia and Herzegovina; Kosovo; Macedonia, the Former Yugoslav Republic of; Moldova, Republic of; Montenegro; Serbia; Turkey; Ukraine; Egypt"
      )
      .click();

    cy.get(".MuiChip-label")
      .contains("Sectors")
      .click()
      .contains(
        "Economic sectors; Transport & Storage; Transport policy and administrative management; Transport policy, planning and administration; Public transport services; Transport regulation; Road transport; Feeder road construction; Feeder road maintenance; National road construction; National road maintenance; Rail transport; Water transport;"
      )
      .click();
  });

  it("reset selects", () => {
    // delete last selection
    cy.get('[data-cy="PillButton-Add Filters"]')
      .contains("Add Filters")
      .click();
    cy.get(".MuiButton-label").contains("Reset").click();
    cy.get('[aria-label="cancel"]').click();

    cy.wait(5000);
    // make sure get back to the main page
    cy.get('[data-cy="homepage-overview disbursement"]').contains("bln");
  });

  it("select and organisation and SDGs and period and advanced filter", () => {
    cy.get('[data-cy="PillButton-Add Filters"]')
      .contains("Add Filters")
      .click();

    // check organisation-multi
    cy.get('[data-cy="PillButton- Organisations"]')
      .contains("Organisations")
      .click();
    cy.get('[aria-label="checkbox"] input').eq(0).check();
    cy.get('[aria-label="back"]').click();

    // check SDG-goal3 goal4
    cy.get('[data-cy="PillButton- SDG - Sustainable Development Goals"]')
      .contains("SDG - Sustainable Development Goals")
      .click();
    cy.get('[aria-disabled="false"] input').eq(3).check();
    cy.get('[aria-disabled="false"] input').eq(4).check();
    cy.get('[aria-label="back"]').click();

    // years 2016-2020
    cy.get('[data-cy="PillButton- Years"]').contains("Years").click();
    cy.get('[id="button-2016"]').click();
    cy.get('[id="to"]').click();
    cy.get('[id="button-2020"]').click();
    cy.get('[aria-label="back"]').click();

    // advanced filters-type of aid-Project-type interventions && Administrative costs not included elsewhere
    cy.get('[data-cy="PillButton-5 Advanced Filters"]').click();
    cy.get('[data-cy="PillButton- Type of aid"]').click();
    cy.get('[aria-disabled="false"] input').eq(0).check();
    cy.get('[aria-disabled="false"] input').eq(1).check();

    cy.get('[data-cy="PillButton-apply"]').click();
  });

  it("homepage should show the correct content", () => {
    cy.wait(5000);
    cy.get('[data-cy="disbursement-period"]').contains("2016 - to 2020");
    cy.get('[data-cy="homepage-overview disbursement"]').contains("mln");

    cy.get('[aria-label="Public Sector Institutions"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Public Sector Institutions");
  });

  it("change filter", () => {
    cy.get('[data-cy="PillButton-Add Filters"]')
      .contains("Add Filters")
      .click();

    //change the sdg g3g4 to g4g5
    cy.get(
      '[data-cy="PillButton- SDG - Sustainable Development Goals"]'
    ).click();
    cy.get('[aria-disabled="false"] input').eq(5).check();
    cy.get('[aria-disabled="false"] input').eq(3).uncheck();
    cy.get('[aria-label="back"]').click();

    // delete advanced filters
    cy.get('[data-cy="PillButton-5 Advanced Filters"]').click();
    cy.get('[data-cy="PillButton- Type of aid"]').click();
    cy.get(".MuiButton-label").contains("Reset").click();
    cy.get('[aria-label="back"]').click();
    cy.get('[aria-label="cancel"]').click();

    //change years
    cy.get(".ChooseAFilterListItem___StyledPillButton-sc-14r1r0b-2")
      .contains("2016")
      .click();
    cy.get('[id="to"]').click();
    cy.get('[id="button-2025"]').click();

    cy.get('[data-cy="PillButton-apply"]').click();
  });

  it("homepage should show the correct content", () => {
    cy.wait(5000);
    cy.get('[data-cy="disbursement-period"]').contains("2016 - to 2021");
    cy.get('[data-cy="homepage-overview disbursement"]').contains("mln");

    cy.get('[aria-label="Public Sector Institutions"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Public Sector Institutions");

    cy.get("h6").contains("mln");
  });
});
