import filter from "lodash/filter";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";
import { mailPanelInitData } from "app/components/FilterPanel/data";

export function getMainFilterPanelData(
  selectedFilters: SelectedFilterAtomModel
) {
  const updatedData = [...mailPanelInitData];
  updatedData[0].selection = [];
  updatedData[1].selection = [];
  updatedData[2].selection = [];
  updatedData[3].selection = [];
  updatedData[4].selection = [];
  updatedData[5].selection = [];
  updatedData[6].selection = [];
  const thematicareas = filter(
    selectedFilters.tag,
    (ta: string) => ta.length > 1
  );
  if (thematicareas.length > 0) {
    updatedData[0].selection = [`${thematicareas.length} thematic areas`];
  }
  if (selectedFilters.countries.length > 0) {
    updatedData[1].selection.push(
      `${selectedFilters.countries.length} countries`
    );
  }
  if (selectedFilters.regions.length > 0) {
    updatedData[1].selection.push(`${selectedFilters.regions.length} regions`);
  }
  if (selectedFilters.sectors.length > 0) {
    updatedData[2].selection.push(`${selectedFilters.sectors.length} sectors`);
  }
  if (selectedFilters.organisationtypes.length > 0) {
    updatedData[3].selection.push(
      `${selectedFilters.organisationtypes.length} organisation types`
    );
  }
  if (selectedFilters.organisations.length > 0) {
    updatedData[3].selection.push(
      `${selectedFilters.organisations.length} organisations`
    );
  }
  if (selectedFilters.sdg.length > 0) {
    updatedData[4].selection.push(`${selectedFilters.sdg.length} SDGS`);
  }
  if (selectedFilters.activitystatus.length > 0) {
    updatedData[5].selection.push(
      `${selectedFilters.activitystatus.length} activity statuses`
    );
  }
  if (selectedFilters.years.length === 2) {
    updatedData[6].selection.push(
      `${selectedFilters.years[0]} - ${selectedFilters.years[1]}`
    );
  }
  return updatedData;
}
