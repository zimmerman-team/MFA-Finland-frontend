/// <reference types="cypress" />

context("Filter", () => {
  beforeEach(() => {
    cy.viewport(1536, 860);
  });

  it("click add filter button", () => {
    cy.visit("localhost:3000");
    cy.get('[data-cy="PillButton-Add Filters"]').click();
  });

  it("Priority area show correct content", () => {
    cy.get('[data-cy="PillButton-All Priorities"]').click();
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
    cy.get('[data-cy="PillButton-All Priorities"]').click();
    cy.get(".MuiAccordionSummary-expandIcon").eq(2).click();
    cy.get('[data-indeterminate="false"]').eq(8).check();

    // apply
    cy.get('[data-cy="PillButton-apply"]').click();

    // selection chip and disbursements
    cy.get(".MuiChip-label").contains(
      "Education, well-functioning societies and democracy - Main priority"
    );
    cy.wait(5000);
    cy.get('[data-cy="priority-area-pie-simple"]').should("exist");
    cy.get("g text").contains("Main priority");
  });

  it("cancel select", () => {
    // delete last selection
    cy.get(".MuiChip-deleteIcon").click({ force: true });
  });

  it("select both contries and sectors", () => {
    cy.get('[data-cy="PillButton-Add Filters"]').click();
    cy.get('[data-cy="PillButton-All Countries and regions"]').click();

    // check Europe
    cy.get('[data-indeterminate="false"]').eq(1).check();

    // check Egypt
    cy.get(".MuiAccordionSummary-expandIcon").eq(1).click();
    cy.get('[data-indeterminate="false"]').eq(15).check();

    // back iconbutton
    cy.get('[aria-label="back"]').click();

    cy.get('[data-cy="PillButton-All Sectors"]').click();

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
      .contains("Countries and regions")
      .click()
      .contains(
        "Albania; Belarus; Bosnia and Herzegowina; Kosovo; Moldova; Montenegro; North Macedonia; Serbia; Turkey; Ukraine; Egypt"
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
    cy.get('[data-cy="PillButton-Add Filters"]').click();
    cy.get(".MuiButton-label").contains("Reset").click();
    cy.get('[aria-label="cancel"]').click();
  });

  it("select and organisation and SDGs and period and advanced filter", () => {
    cy.get('[data-cy="PillButton-Add Filters"]').click();

    // check organisation-multi
    // cy.get('[data-cy="PillButton-All Organisations"]').click();
    // cy.get('[type="checkbox"] input').eq(0).check();
    // cy.get('[aria-label="back"]').click();

    // check SDG-goal3 goal4
    cy.get(
      '[data-cy="PillButton-All SDGs - Sustainable Development Goals"]'
    ).click();
    cy.get('[aria-disabled="false"] input').eq(3).check();
    cy.get('[aria-disabled="false"] input').eq(4).check();
    cy.get('[aria-label="back"]').click();

    // years 2016-2020
    cy.get('[data-cy="PillButton-All Years"]').click();
    cy.get('[id="button-2016"]').click();
    cy.get('[id="to"]').click();
    cy.get('[id="button-2020"]').click();
    cy.get('[aria-label="back"]').click();

    // advanced filters-type of aid-Project-type interventions && Administrative costs not included elsewhere
    cy.get('[data-cy="PillButton-5 Advanced filters"]').click();
    cy.get('[data-cy="PillButton-All Cooperation modalities"]').click();
    cy.get('[aria-disabled="false"] input').eq(0).check();
    cy.get('[aria-disabled="false"] input').eq(1).check();

    cy.get('[data-cy="PillButton-apply"]').click();
  });

  it("homepage should show the correct content", () => {
    cy.wait(5000);
    cy.get('[data-cy="disbursement-period"]').contains("2016 - 2020");

    cy.get('[aria-label="Public Sector Institutions"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Public Sector Institutions");
  });

  it("change filter", () => {
    cy.get('[data-cy="PillButton-Add Filters"]').click();

    //change the sdg g3g4 to g4g5
    cy.get(
      '[data-cy="PillButton-All SDGs - Sustainable Development Goals"]'
    ).click();
    cy.get('[aria-disabled="false"] input').eq(5).check();
    cy.get('[aria-disabled="false"] input').eq(3).uncheck();
    cy.get('[aria-label="back"]').click();

    // delete advanced filters
    cy.get('[data-cy="PillButton-5 Advanced filters"]').click();
    cy.get('[data-cy="PillButton-All Cooperation modalities"]').click();
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
    cy.get('[data-cy="disbursement-period"]').contains("2016 - 2021");

    cy.get('[aria-label="Public Sector Institutions"]').trigger("mouseover", {
      force: true,
    });
    cy.get("b").contains("Public Sector Institutions");
  });
});
