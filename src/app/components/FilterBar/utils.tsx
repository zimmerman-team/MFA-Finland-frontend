import get from "lodash/get";
import find from "lodash/find";
import { FILTER_TYPES } from "app/components/FilterPanel/data";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";

export function shouldRender(location: any) {
  const urls = ["/about", "/feedback", "/statement", "/project/"];
  const currentLocation = location.pathname;
  let found = urls.some((url) => {
    return currentLocation.includes(url);
  });
  if (found === false) {
    return true;
  } else {
    return false;
  }
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
  const thematicareas = get(filterOptions, "themacticareas.data.data", []);
  const countries = get(filterOptions, "countries.data.data", []);
  const regions = get(filterOptions, "regions.data.data", []);
  const sectors = get(filterOptions, "sectors.data.data", []);
  const organisations = get(filterOptions, "organisations.data.data", []);
  const sdgs = get(filterOptions, "sdgs.data.data", []);
  const activitystatus = get(filterOptions, "activitystatus.data.data", []);

  filters.tag.forEach((tag: string) => {
    const fArea = find(thematicareas, { code: tag });
    if (fArea) {
      chips.push({
        name: fArea.name,
        value: tag,
        type: FILTER_TYPES.THEMATIC_AREAS,
      });
    } else {
      const fSdg = find(sdgs, { code: tag });
      if (fSdg) {
        chips.push({
          name: fSdg.name,
          value: tag,
          type: FILTER_TYPES.SDGS,
        });
      }
    }
  });

  filters.countries.forEach((country: string) => {
    const fCountry = find(countries, { code: country });
    if (fCountry) {
      chips.push({
        name: fCountry.name,
        value: country,
        type: FILTER_TYPES.COUNTRIES,
      });
    }
  });

  filters.regions.forEach((region: string) => {
    const fRegion = find(regions, { code: region });
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

  filters.regions.forEach((actstatus: string) => {
    const fActivitystatus = find(activitystatus, { code: actstatus });
    if (fActivitystatus) {
      chips.push({
        name: fActivitystatus.name,
        value: actstatus,
        type: FILTER_TYPES.ACTIVITY_STATUS,
      });
    }
  });

  return chips;
}
