import get from "lodash/get";
import find from "lodash/find";
import {
  FILTER_TYPES,
  humanrightfilteroptions,
} from "app/components/FilterPanel/data";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";

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
  type: any;
  name: string;
  value: string;
}

export function getFilterChips(
  filters: SelectedFilterAtomModel,
  filterOptions: any
): ChipModel[] {
  const chips: ChipModel[] = [];
  const thematicareas = get(filterOptions, "thematicareas.data.data", []);
  const locations = get(filterOptions, "locations.data.data", []);
  const sectors = get(filterOptions, "sectors.data.data", []);
  const organisations = get(filterOptions, "organisations.data.data", []);
  const sdgs = get(filterOptions, "sdgs.data.data.goals", []);
  const activitystatus = get(filterOptions, "activitystatus.data.data", []);
  const policymarkers = get(filterOptions, "policymarkers.data.data", []);
  const aidtypes = get(filterOptions, "aidtypes.data.data", []);
  const budgetlines = get(filterOptions, "budgetlines.data.data.data", []);
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

  filters.tag.forEach((tag: string) => {
    let name = "";
    let fArea = find(thematicareas, { code: tag });
    if (!fArea) {
      thematicareas.forEach((area: any) => {
        if (!fArea) {
          fArea = find(area.children, { code: tag });
          if (fArea) {
            name = `${area.name} - ${fArea.name}`;
          }
        }
      });
    } else {
      name = fArea.name;
    }
    if (fArea) {
      chips.push({
        name,
        value: tag,
        type: FILTER_TYPES.THEMATIC_AREAS,
      });
    }
  });

  filters.sdg.forEach((sdg: string) => {
    const fSdg = find(sdgs, { code: sdg });
    if (fSdg) {
      chips.push({
        name: fSdg.name,
        value: sdg,
        type: FILTER_TYPES.SDGS,
      });
    }
  });

  let allLocations: any = [];
  locations.forEach((region: any) => {
    allLocations = [...allLocations, ...region.children];
  });

  filters.countries.forEach((country: string) => {
    const fCountry = find(allLocations, { code: country });
    if (fCountry) {
      chips.push({
        name: fCountry.name,
        value: country,
        type: FILTER_TYPES.COUNTRIES,
      });
    }
  });

  filters.regions.forEach((region: string) => {
    const fRegion = find(allLocations, { code: region });
    if (fRegion) {
      chips.push({
        name: fRegion.name,
        value: region,
        type: FILTER_TYPES.COUNTRIES,
      });
    }
  });

  filters.sectors.forEach((sector: string) => {
    const fSector = find(sectors, { code: sector });
    if (fSector) {
      chips.push({
        name: fSector.name,
        value: sector,
        type: FILTER_TYPES.SECTORS,
      });
    } else {
      sectors.forEach((sectorOpt: any) => {
        if (sectorOpt.children) {
          const fSectorSub = find(sectorOpt.children, { code: sector });
          if (fSectorSub) {
            chips.push({
              name: fSectorSub.name,
              value: sector,
              type: FILTER_TYPES.SECTORS,
            });
          } else {
            sectorOpt.children.forEach((sectorOptSub: any) => {
              if (sectorOpt.children) {
                const fSectorSubSub = find(sectorOptSub.children, {
                  code: sector,
                });
                if (fSectorSubSub) {
                  chips.push({
                    name: fSectorSubSub.name,
                    value: sector,
                    type: FILTER_TYPES.SECTORS,
                  });
                }
              }
            });
          }
        }
      });
    }
  });

  filters.organisations.forEach((organisation: string) => {
    let fOrg;
    organisations.forEach((orgType: any) => {
      fOrg = find(orgType.children, { code: organisation });
    });
    if (fOrg) {
      chips.push({
        value: organisation,
        name: get(fOrg, "name", ""),
        type: FILTER_TYPES.ORGANISATIONS,
      });
    }
  });

  filters.organisationtypes.forEach((organisationType: string) => {
    const fOrgType = find(organisations, { code: organisationType });
    if (fOrgType) {
      chips.push({
        name: fOrgType.name,
        value: organisationType,
        type: FILTER_TYPES.ORGANISATIONS,
      });
    }
  });

  filters.activitystatus.forEach((actstatus: string) => {
    const fActivitystatus = find(activitystatus, { code: actstatus });
    if (fActivitystatus) {
      chips.push({
        name: fActivitystatus.name,
        value: actstatus,
        type: FILTER_TYPES.ACTIVITY_STATUS,
      });
    }
  });

  filters.policymarker.forEach((pm: string) => {
    const fPolicymarker = find(policymarkers, { code: pm });
    if (fPolicymarker) {
      chips.push({
        name: fPolicymarker.name,
        value: pm,
        type: FILTER_TYPES.POLICY_MARKERS,
      });
    }
  });

  filters.defaultaidtype.forEach((type: string) => {
    const fAidtype = find(aidtypes, { code: type });
    if (fAidtype) {
      chips.push({
        name: fAidtype.name,
        value: type,
        type: FILTER_TYPES.AID_TYPE,
      });
    }
  });

  filters.budgetlines.forEach((line: string) => {
    const fBudgetline = find(budgetlines, { code: line });
    if (fBudgetline) {
      chips.push({
        name: fBudgetline.name,
        value: line,
        type: FILTER_TYPES.BUDGET_LINES,
      });
    }
  });

  filters.collaborationtype.forEach((code: string) => {
    const fItem = find(bimulti, { code });
    if (fItem) {
      chips.push({
        name: fItem.name,
        value: code,
        type: FILTER_TYPES.BI_MULTI,
      });
    }
  });

  filters.humanrights.forEach((code: string) => {
    const fItem = find(humanrightfilteroptions, { code });
    if (fItem) {
      chips.push({
        name: fItem.name,
        value: code,
        type: FILTER_TYPES.HUMAN_RIGHTS,
      });
    }
  });

  // if (filters.years.length > 1) {
  //   chips.push({
  //     name:
  //       filters.years[0] === filters.years[1]
  //         ? filters.years[0]
  //         : `${filters.years[0]} - ${filters.years[1]}`,
  //     value: `${filters.years[0]},${filters.years[1]}`,
  //     type: FILTER_TYPES.PERIOD,
  //   });
  // }

  return chips;
}
