import get from "lodash/get";
import filter from "lodash/filter";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";
import {
  mailPanelInitData,
  advancedPanelInitData,
} from "app/components/FilterPanel/data";

export function getMainFilterPanelData(
  selectedFilters: SelectedFilterAtomModel,
  cmsData: any
) {
  const updatedData = [...mailPanelInitData];
  updatedData[0].selection = [];
  updatedData[0].heading = get(
    cmsData,
    "general.thematicareas",
    "Thematic Areas"
  );
  updatedData[0].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[0].heading
  }`;
  updatedData[1].selection = [];
  updatedData[1].heading = get(
    cmsData,
    "viz.countriesregions",
    "Countries/Regions"
  );
  updatedData[1].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[1].heading
  }`;
  updatedData[2].selection = [];
  updatedData[2].heading = get(cmsData, "general.sectors", "Sectors");
  updatedData[2].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[2].heading
  }`;
  updatedData[3].selection = [];
  updatedData[3].heading = get(
    cmsData,
    "general.organisations",
    "Organisations"
  );
  updatedData[3].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[3].heading
  }`;
  updatedData[4].selection = [];
  updatedData[4].heading = get(cmsData, "general.sdgs", "SDGs");
  updatedData[4].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[4].heading
  }`;
  updatedData[5].selection = [];
  updatedData[5].heading = get(
    cmsData,
    "filters.activitystatus",
    "Activity Status"
  );
  updatedData[5].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[5].heading
  }`;
  updatedData[6].selection = [];
  updatedData[6].heading = get(cmsData, "filters.period", "Period");
  updatedData[6].label = `${get(cmsData, "filters.all", "All")} ${get(
    cmsData,
    "filters.years",
    "years"
  )}`;
  updatedData[7].heading = get(
    cmsData,
    "filters.advancedfilters",
    "Advanced Filters"
  );
  updatedData[7].label = `5 ${get(
    cmsData,
    "filters.advancedfilters",
    "Advanced Filters"
  )}`;

  const thematicareas = filter(
    selectedFilters.tag,
    (ta: string) => ta.length > 1
  );
  if (thematicareas.length > 0) {
    updatedData[0].selection = [
      `${get(cmsData, "general.thematicareas", "Thematic Areas")} (${
        thematicareas.length
      })`,
    ];
  }
  if (selectedFilters.countries.length > 0) {
    updatedData[1].selection.push(
      `${get(cmsData, "filters.countries", "Countries")} (${
        selectedFilters.countries.length
      })`
    );
  }
  if (selectedFilters.regions.length > 0) {
    updatedData[1].selection.push(
      `${get(cmsData, "filters.regions", "Regions")} (${
        selectedFilters.regions.length
      })`
    );
  }
  if (selectedFilters.sectors.length > 0) {
    updatedData[2].selection.push(
      `${get(cmsData, "general.sectors", "Sectors")} (${
        selectedFilters.sectors.length
      })`
    );
  }
  // if (selectedFilters.organisationtypes.length > 0) {
  //   updatedData[3].selection.push(
  //     `${selectedFilters.organisationtypes.length} organisation types`
  //   );
  // }
  if (selectedFilters.organisations.length > 0) {
    updatedData[3].selection.push(
      `${get(cmsData, "general.organisations", "Organisations")} (${
        selectedFilters.organisations.length
      })`
    );
  }
  if (selectedFilters.sdg.length > 0) {
    updatedData[4].selection.push(
      `${get(cmsData, "general.sdgs", "SDGs")} (${selectedFilters.sdg.length})`
    );
  }
  if (selectedFilters.activitystatus.length > 0) {
    updatedData[5].selection.push(
      `${get(cmsData, "filters.activitystatus", "Activity Status")} (${
        selectedFilters.activitystatus.length
      })`
    );
  }
  if (selectedFilters.years.length === 2) {
    updatedData[6].selection.push(
      `${selectedFilters.years[0]} - ${selectedFilters.years[1]}`
    );
  }
  return updatedData;
}

export function getAdvancedFilterPanelData(
  selectedFilters: SelectedFilterAtomModel,
  cmsData: any
) {
  const updatedData = [...advancedPanelInitData];
  updatedData[0].selection = [];
  updatedData[0].heading = get(
    cmsData,
    "filters.policymarkers",
    "Policy Markers"
  );
  updatedData[0].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[0].heading
  }`;
  updatedData[1].selection = [];
  updatedData[1].heading = get(cmsData, "filters.typeofaid", "Type of aid");
  updatedData[1].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[1].heading
  }`;
  updatedData[2].selection = [];
  updatedData[2].heading = get(cmsData, "general.budgetlines", "Budget lines");
  updatedData[2].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[2].heading
  }`;
  updatedData[3].selection = [];
  updatedData[3].heading = get(cmsData, "filters.bimulti", "Bi/Multi");
  updatedData[3].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[3].heading
  }`;
  updatedData[4].selection = [];
  updatedData[4].heading = get(
    cmsData,
    "filters.humanrights",
    "Human rights approach"
  );
  updatedData[4].label = `${get(cmsData, "filters.all", "All")} ${
    updatedData[4].heading
  }`;

  if (selectedFilters.policymarker.length > 0) {
    updatedData[0].selection.push(
      `${get(cmsData, "filters.policymarkers", "Policy Markers")} (${
        selectedFilters.policymarker.length
      })`
    );
  }
  if (selectedFilters.defaultaidtype.length > 0) {
    updatedData[1].selection.push(
      `${get(cmsData, "filters.typeofaid", "Type of aid")} (${
        selectedFilters.defaultaidtype.length
      })`
    );
  }
  if (selectedFilters.budgetlines.length > 0) {
    updatedData[2].selection.push(
      `${get(cmsData, "general.budgetlines", "Budget lines")} (${
        selectedFilters.budgetlines.length
      })`
    );
  }
  if (selectedFilters.collaborationtype.length > 0) {
    updatedData[3].selection.push(
      `${get(cmsData, "filters.bimulti", "Bi/Multi")} (${
        selectedFilters.collaborationtype.length
      })`
    );
  }
  if (selectedFilters.humanrights.length > 0) {
    updatedData[4].selection.push(
      `${get(cmsData, "filters.humanrights", "Human rights approach")} (${
        selectedFilters.humanrights.length
      })`
    );
  }

  return updatedData;
}
