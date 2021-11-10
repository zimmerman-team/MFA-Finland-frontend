import get from "lodash/get";
import find from "lodash/find";
import uniqBy from "lodash/uniqBy";
import { getName } from "app/components/Charts/sdg";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";
import {
  FILTER_TYPES,
  humanrightfilteroptions,
} from "app/components/FilterPanel/data";

export function shouldRender(location: any) {
  const urls = [
    "/about",
    "/feedback",
    "/statement",
    "/statements",
    "/result",
    "/project/",
    "/contact",
    "/privacy",
    "/info",
    "/faq",
  ];
  const currentLocation = location.pathname;
  const found = urls.some((url) => {
    return currentLocation.includes(url);
  });
  if (found === false) {
    return true;
  }
  return false;
}

export function getMockData() {
  return [
    { name: "2020" },
    { name: "Organisation Category A" },
    { name: "Organisation A" },
    { name: "Sector A" },
    { name: "Sector B" },
    { name: "Cancelled" },
    { name: "Reimbursed" },
    { name: "eimbursed" },
    { name: "imbursed" },
    { name: "mbursed" },
    { name: "bursed" },
    { name: "ursed" },
    { name: "rsed" },
    { name: "sed" },
    { name: "ed" },
    { name: "d" },
    { name: "di" },
    { name: "dic" },
    { name: "dict" },
    { name: "dicte" },
    { name: "dictee" },
  ];
}

export interface ChipModel {
  label: string;
  values: { label: string; value: string }[];
  type: FILTER_TYPES;
}

export function getFilterChip(
  filters: SelectedFilterAtomModel,
  filterOptions: any,
  currentLanguage: string
) {
  const chips: ChipModel[] = [];
  const thematicChip = createThematicChip(filters, filterOptions);
  const countriesChip = createCountriesChip(
    filters,
    filterOptions,
    currentLanguage
  );
  const sectorsChip = createSectorsChip(
    filters,
    filterOptions,
    currentLanguage
  );
  const organisationChip = createOrganisationChip(filters, filterOptions);
  const organisationTypeChip = createOrganisationTypeChip(
    filters,
    filterOptions
  );
  const sdgChip = createSDGChip(filters, filterOptions);
  const activityStatusChip = createActivityStatusChip(filters, filterOptions);
  const policyMarkerChip = createPolicyMarkerChip(filters, filterOptions);
  const defaultAidTypeChip = createDefaultAidTypeChip(filters, filterOptions);
  const budgetLinesChip = createBudgetLinesChip(
    filters,
    filterOptions,
    currentLanguage
  );
  const collaborationChip = createCollaborationChip(filters, filterOptions);
  const humanRightsChip = createHumanRightsChip(filters, filterOptions);
  const periodChip = createPeriodChip(filters, filterOptions);

  if (thematicChip) {
    chips.push(thematicChip);
  }
  if (countriesChip) {
    chips.push(countriesChip);
  }
  if (sectorsChip) {
    chips.push(sectorsChip);
  }
  if (organisationChip) {
    chips.push(organisationChip);
  }
  if (organisationTypeChip) {
    chips.push(organisationTypeChip);
  }
  if (sdgChip) {
    chips.push(sdgChip);
  }
  if (activityStatusChip) {
    chips.push(activityStatusChip);
  }
  if (policyMarkerChip) {
    chips.push(policyMarkerChip);
  }
  if (defaultAidTypeChip) {
    chips.push(defaultAidTypeChip);
  }
  if (budgetLinesChip) {
    chips.push(budgetLinesChip);
  }
  if (collaborationChip) {
    chips.push(collaborationChip);
  }
  if (humanRightsChip) {
    chips.push(humanRightsChip);
  }
  if (periodChip) {
    chips.push(periodChip);
  }
  return chips;
}

// Fix this function
function createThematicChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
): ChipModel | null {
  const thematicAreaOptions = get(filterOptions, "thematicareas.data.data", []);
  const type = FILTER_TYPES.THEMATIC_AREAS;
  const values: { label: string; value: string }[] = [];
  if (selectedFilters.tag.length > 1) {
    selectedFilters.tag.forEach((tag: string) => {
      let label = "";
      let fArea = find(thematicAreaOptions, { code: tag });
      if (!fArea) {
        thematicAreaOptions.forEach((area: any) => {
          if (!fArea) {
            fArea = find(area.children, { code: tag });
            if (fArea) {
              label = `${area.name} - ${fArea.name}`;
            }
          }
        });
      } else {
        label = fArea.name;
      }

      if (fArea) {
        values.push({ label, value: tag });
      }
    });

    return {
      label: "Thematic Areas",
      values,
      type: FILTER_TYPES.THEMATIC_AREAS,
    };
  }
  let label = "";
  const tag = selectedFilters.tag[0];
  let fArea = find(thematicAreaOptions, { code: tag });
  if (!fArea) {
    thematicAreaOptions.forEach((area: any) => {
      if (!fArea) {
        fArea = find(area.children, { code: tag });
        if (fArea) {
          label = `${area.name} - ${fArea.name}`;
        }
      }
    });
  } else {
    label = fArea.name;
  }

  if (fArea) {
    values.push({ label, value: tag });
    return { label, values, type };
  }

  return null;
}

function createCountriesChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any,
  currentLanguage: string
): ChipModel | null {
  const type = FILTER_TYPES.COUNTRIES;
  const values: { label: string; value: string }[] = [];
  const locations = get(filterOptions, "locations.data.data", []);
  let label = "";

  let allLocations: any = [];
  locations.forEach((region: any) => {
    if (region.children) {
      allLocations = [...allLocations, ...region.children];
    }
  });
  selectedFilters.countries.forEach((country: string) => {
    const fCountry = find(allLocations, { code: country });
    if (fCountry) {
      values.push({
        value: country,
        label: fCountry[getName(currentLanguage)] || fCountry.name,
      });
    }
  });

  if (selectedFilters.countries.length > 1) {
    label = "Countries/Regions";
  } else if (selectedFilters.countries.length === 1) {
    label = values[0].label;
  }
  if (selectedFilters.countries.length >= 1) {
    return { label, values, type };
  }
  return null;
}

function createSectorsChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any,
  currentLanguage: string
) {
  const sectors = get(filterOptions, "sectors.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.sectors.forEach((sector: string) => {
    const fSector = find(sectors, { code: sector });
    if (fSector) {
      values.push({
        label: fSector[getName(currentLanguage)] || fSector.name,
        value: sector,
      });
    } else {
      sectors.forEach((sectorOpt: any) => {
        if (sectorOpt.children) {
          const fSectorSub = find(sectorOpt.children, { code: sector });
          if (fSectorSub) {
            values.push({
              label: fSectorSub[getName(currentLanguage)] || fSectorSub.name,
              value: sector,
            });
          } else {
            sectorOpt.children.forEach((sectorOptSub: any) => {
              if (sectorOpt.children) {
                const fSectorSubSub = find(sectorOptSub.children, {
                  code: sector,
                });
                if (fSectorSubSub) {
                  values.push({
                    label:
                      fSectorSubSub[getName(currentLanguage)] ||
                      fSectorSubSub.name,
                    value: sector,
                  });
                }
              }
            });
          }
        }
      });
    }
  });
  if (selectedFilters.sectors.length > 1) {
    return { label: "Sectors", values, type: FILTER_TYPES.SECTORS };
  }
  if (selectedFilters.sectors.length === 1) {
    return { label: values[0].label, values, type: FILTER_TYPES.SECTORS };
  }
  return null;
}

function createOrganisationChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const organisations = get(filterOptions, "organisations.data.data", []);
  let values: { label: string; value: string }[] = [];
  selectedFilters.organisations.forEach((organisation: string) => {
    let fOrg;
    organisations.forEach((orgType: any) => {
      fOrg = find(orgType.children, (child) => {
        return child.code === organisation;
      });
      if (fOrg) {
        values.push({
          label: get(fOrg, "name", ""),
          value: organisation,
        });
      } else {
        organisations.forEach((orgOpt: any) => {
          if (orgOpt.children) {
            const fOrgSub = find(orgOpt.children, { code: organisation });
            if (fOrgSub) {
              values.push({
                label: fOrgSub.name,
                value: organisation,
              });
            } else {
              orgOpt.children.forEach((orgOptSub: any) => {
                if (orgOptSub.children) {
                  const fOrgSubSub = find(orgOptSub.children, {
                    code: organisation,
                  });
                  if (fOrgSubSub) {
                    values.push({
                      label: fOrgSubSub.name,
                      value: organisation,
                    });
                  } else {
                    orgOptSub.children.forEach((orgOptSubSub: any) => {
                      if (orgOptSubSub.children) {
                        const fOrgSubSubSub = find(orgOptSubSub.children, {
                          code: organisation,
                        });
                        if (fOrgSubSubSub) {
                          values.push({
                            label: fOrgSubSubSub.name,
                            value: organisation,
                          });
                        } else {
                          orgOptSubSub.children.forEach(
                            (orgOptSubSubSub: any) => {
                              if (orgOptSubSubSub.children) {
                                const fOrgSubSubSubSub = find(
                                  orgOptSubSubSub.children,
                                  {
                                    code: organisation,
                                  }
                                );
                                if (fOrgSubSubSubSub) {
                                  values.push({
                                    label: fOrgSubSubSubSub.name,
                                    value: organisation,
                                  });
                                }
                              }
                            }
                          );
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  });

  values = uniqBy(values, ["label", "value"]);

  if (selectedFilters.organisations.length > 1) {
    return { label: "Organisations", values, type: FILTER_TYPES.ORGANISATIONS };
  }
  if (selectedFilters.organisations.length === 1) {
    return { label: values[0].label, values, type: FILTER_TYPES.ORGANISATIONS };
  }
  return null;
}

function createOrganisationTypeChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const organisations = get(filterOptions, "organisations.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.organisationtypes.forEach((organisationType: string) => {
    const fOrgType = find(organisations, { code: organisationType });
    if (fOrgType) {
      values.push({
        label: fOrgType.name,
        value: organisationType,
      });
    }
  });

  if (selectedFilters.organisationtypes.length > 1) {
    return {
      label: "Ogranisation Types",
      values,
      type: FILTER_TYPES.ORGANISATIONS,
    };
  }
  if (selectedFilters.organisationtypes.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.ORGANISATION_TYPE,
    };
  }
  return null;
}

function createActivityStatusChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const activitystatus = get(filterOptions, "activitystatus.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.activitystatus.forEach((actstatus: string) => {
    const foundActivity = find(activitystatus, { code: actstatus });
    if (foundActivity) {
      values.push({
        label: foundActivity.name,
        value: actstatus,
      });
    }
  });

  if (selectedFilters.activitystatus.length > 1) {
    return {
      label: "Activity Statutes",
      values,
      type: FILTER_TYPES.ACTIVITY_STATUS,
    };
  }
  if (selectedFilters.activitystatus.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.ACTIVITY_STATUS,
    };
  }
  return null;
}

function createSDGChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const sdgs = get(filterOptions, "sdgs.data.data.goals", []);
  const values: { label: string; value: string }[] = [];
  selectedFilters.sdg.forEach((sdg: string) => {
    const fSdg = find(sdgs, { code: sdg });
    if (fSdg) {
      values.push({
        label: fSdg.name,
        value: sdg,
      });
    }
  });

  if (selectedFilters.sdg.length > 1) {
    return {
      label: "SDGs",
      values,
      type: FILTER_TYPES.SDGS,
    };
  }
  if (selectedFilters.sdg.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.SDGS,
    };
  }
  return null;
}

function createPolicyMarkerChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const policymarkers = get(filterOptions, "policymarkers.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.policymarker.forEach((pm: string) => {
    const fPolicymarker = find(policymarkers, { code: pm });
    if (fPolicymarker) {
      values.push({
        label: fPolicymarker.name,
        value: pm,
      });
    }
  });

  if (selectedFilters.policymarker.length > 1) {
    return {
      label: "Policy Markers",
      values,
      type: FILTER_TYPES.POLICY_MARKERS,
    };
  }
  if (selectedFilters.policymarker.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.POLICY_MARKERS,
    };
  }
  return null;
}

function createDefaultAidTypeChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const aidtypes = get(filterOptions, "aidtypes.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.defaultaidtype.forEach((aidType: string) => {
    const fAidType = find(aidtypes, { code: aidType });
    if (fAidType) {
      values.push({
        label: fAidType.name,
        value: aidType,
      });
    }
  });

  if (selectedFilters.defaultaidtype.length > 1) {
    return {
      label: "Default Aid Types",
      values,
      type: FILTER_TYPES.AID_TYPE,
    };
  }
  if (selectedFilters.defaultaidtype.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.AID_TYPE,
    };
  }
  return null;
}

function createBudgetLinesChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any,
  currentLanguage: string
) {
  const budgetlines = get(filterOptions, "budgetlines.data.data", []);
  const values: { label: string; value: string }[] = [];

  selectedFilters.budgetlines.forEach((line: string) => {
    const fBudgetline = find(budgetlines, { code: line });
    if (fBudgetline) {
      values.push({
        label: fBudgetline[getName(currentLanguage)] || fBudgetline.name,
        value: line,
      });
    }
  });

  if (selectedFilters.budgetlines.length > 1) {
    return {
      label: "Budget Lines",
      values,
      type: FILTER_TYPES.BUDGET_LINES,
    };
  }

  if (selectedFilters.budgetlines.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.BUDGET_LINES,
    };
  }
  return null;
}

function createCollaborationChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const bimulti = [
    {
      name: "Bi",
      code: "1",
    },
    {
      name: "Multi",
      code: "2",
    },
  ];
  const values: { label: string; value: string }[] = [];

  selectedFilters.collaborationtype.forEach((code: string) => {
    const fItem = find(bimulti, { code });
    if (fItem) {
      values.push({
        label: fItem.name,
        value: code,
      });
    }
  });

  if (selectedFilters.collaborationtype.length > 1) {
    return {
      label: "Collaboration Type",
      values,
      type: FILTER_TYPES.BI_MULTI,
    };
  }
  if (selectedFilters.collaborationtype.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.BI_MULTI,
    };
  }
  return null;
}

function createHumanRightsChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  const values: { label: string; value: string }[] = [];

  selectedFilters.humanrights.forEach((code: string) => {
    const fItem = find(humanrightfilteroptions, { code });
    if (fItem) {
      values.push({
        label: fItem.name,
        value: code,
      });
    }
  });

  if (selectedFilters.humanrights.length > 1) {
    return {
      label: "Human rights",
      values,
      type: FILTER_TYPES.HUMAN_RIGHTS,
    };
  }
  if (selectedFilters.humanrights.length === 1) {
    return {
      label: values[0].label,
      values,
      type: FILTER_TYPES.HUMAN_RIGHTS,
    };
  }
  return null;
}

function createPeriodChip(
  selectedFilters: SelectedFilterAtomModel,
  filterOptions: any
) {
  if (selectedFilters.years.length > 1) {
    return {
      label:
        selectedFilters.years[0] === selectedFilters.years[1]
          ? selectedFilters.years[0]
          : `${selectedFilters.years[0]} - ${selectedFilters.years[1]}`,
      values: [
        { value: selectedFilters.years[0], label: selectedFilters.years[0] },
        { value: selectedFilters.years[1], label: selectedFilters.years[1] },
      ],
      type: FILTER_TYPES.PERIOD,
    };
  }
  return null;
}
