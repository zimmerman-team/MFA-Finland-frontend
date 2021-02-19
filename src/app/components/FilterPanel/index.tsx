import React from "react";
import get from "lodash/get";
import remove from "lodash/remove";
import { useRecoilState } from "recoil";
import { Container } from "@material-ui/core";
import { useStoreState } from "app/state/store/hooks";
import { createStyles } from "app/components/FilterPanel/styles";
import { Filter } from "app/components/FilterPanel/Panels/Filter";
import {
  selectedFilterAtom,
  currentFilterOpenAtom,
  defaultfilters,
} from "app/state/recoil/atoms";
import {
  FILTER_TYPES,
  FilterPanelProps,
  MailPanelInitDataItemModel,
} from "app/components/FilterPanel/data";
import { getMainFilterPanelData } from "app/components/FilterPanel/utils";
import { ChooseAFilterPanel } from "app/components/FilterPanel/Panels/ChooseAFilterPanel";

// TODO: FilterPanel Main: display selected filters
// TODO: FilterPanel Filter: display selected filters
// TODO: FilterPanel Filter: reset filter
// TODO: FilterPanel Filter: select all
// TODO: FilterPanel Filter: apply
// TODO: FilterPanel Filter: recent/filter

export const FilterPanel = (props: FilterPanelProps) => {
  const styles = createStyles(props);
  const [currentFilterOpen, setCurrentFilterOpen] = useRecoilState(
    currentFilterOpenAtom
  );
  const filterOptionsData = useStoreState((state) => state.filterOptions);
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const [localSelectedFilters, setLocalSelectedFilters] = React.useState(
    selectedFilters
  );
  const [mainPanelData, setMainPanelData] = React.useState<
    MailPanelInitDataItemModel[]
  >([]);

  React.useEffect(() => {
    setMainPanelData(getMainFilterPanelData(localSelectedFilters));
  }, [localSelectedFilters]);

  React.useEffect(() => {
    setLocalSelectedFilters(selectedFilters);
  }, [selectedFilters]);

  function onFilterCheckboxChange(value: string, type: any): void {
    const updatedSelectedFilters = { ...localSelectedFilters };
    switch (type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        if (updatedSelectedFilters.tag.indexOf(value) > -1) {
          remove(updatedSelectedFilters.tag, (t: string) => t === value);
        } else {
          updatedSelectedFilters.tag = [...updatedSelectedFilters.tag, value];
        }
        break;
      case FILTER_TYPES.COUNTRIES:
        if (value.length === 2) {
          if (updatedSelectedFilters.countries.indexOf(value) > -1) {
            remove(
              updatedSelectedFilters.countries,
              (t: string) => t === value
            );
          } else {
            updatedSelectedFilters.countries = [
              ...updatedSelectedFilters.countries,
              value,
            ];
          }
        } else if (updatedSelectedFilters.regions.indexOf(value) > -1) {
          remove(updatedSelectedFilters.regions, (t: string) => t === value);
        } else {
          updatedSelectedFilters.regions = [
            ...updatedSelectedFilters.regions,
            value,
          ];
        }
        break;
      case FILTER_TYPES.SECTORS:
        if (updatedSelectedFilters.sectors.indexOf(value) > -1) {
          remove(updatedSelectedFilters.sectors, (t: string) => t === value);
        } else {
          updatedSelectedFilters.sectors = [
            ...updatedSelectedFilters.sectors,
            value,
          ];
        }
        break;
      case FILTER_TYPES.ORGANISATIONS:
        if (value.length === 2) {
          if (updatedSelectedFilters.organisationtypes.indexOf(value) > -1) {
            remove(
              updatedSelectedFilters.organisationtypes,
              (t: string) => t === value
            );
          } else {
            updatedSelectedFilters.organisationtypes = [
              ...updatedSelectedFilters.organisationtypes,
              value,
            ];
          }
        } else if (updatedSelectedFilters.organisations.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.organisations,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.organisations = [
            ...updatedSelectedFilters.organisations,
            value,
          ];
        }
        break;
      case FILTER_TYPES.SDGS:
        if (updatedSelectedFilters.sdg.indexOf(value) > -1) {
          remove(updatedSelectedFilters.sdg, (t: string) => t === value);
        } else {
          updatedSelectedFilters.sdg = [...updatedSelectedFilters.sdg, value];
        }
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        if (updatedSelectedFilters.activitystatus.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.activitystatus,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.activitystatus = [
            ...updatedSelectedFilters.activitystatus,
            value,
          ];
        }
        break;
      case FILTER_TYPES.PERIOD:
        updatedSelectedFilters.years = value.split(",");
        break;
      default:
        break;
    }
    setLocalSelectedFilters(updatedSelectedFilters);
  }

  function onSelectAllCheckboxChange(type: any): void {
    const updatedSelectedFilters = { ...localSelectedFilters };
    let values: string[] = [];
    switch (type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        values = get(filterOptionsData.thematicareas, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.tag.length === values.length) {
          updatedSelectedFilters.tag = [];
        } else {
          updatedSelectedFilters.tag = [
            ...updatedSelectedFilters.tag,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.COUNTRIES:
        values = get(filterOptionsData.countries, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.countries.length === values.length) {
          updatedSelectedFilters.countries = [];
        } else {
          updatedSelectedFilters.countries = [
            ...updatedSelectedFilters.countries,
            ...values,
          ];
        }
        values = get(filterOptionsData.regions, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.regions.length === values.length) {
          updatedSelectedFilters.regions = [];
        } else {
          updatedSelectedFilters.regions = [
            ...updatedSelectedFilters.regions,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.SECTORS:
        get(filterOptionsData.sectors, "data.data", []).forEach(
          (sector: any) => {
            values = [...values, sector.code];
            if (sector.children) {
              sector.children.forEach((child: any) => {
                values = [...values, child.code];
                if (child.children) {
                  values = [
                    ...values,
                    ...child.children.map((gchild: any) => gchild.code),
                  ];
                }
              });
            }
          }
        );
        if (updatedSelectedFilters.sectors.length === values.length) {
          updatedSelectedFilters.sectors = [];
        } else {
          updatedSelectedFilters.sectors = [
            ...updatedSelectedFilters.sectors,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.ORGANISATIONS:
        values = get(filterOptionsData.organisations, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.organisationtypes.length === values.length) {
          updatedSelectedFilters.organisationtypes = [];
        } else {
          updatedSelectedFilters.organisationtypes = [
            ...updatedSelectedFilters.organisationtypes,
            ...values,
          ];
        }
        values = [];
        get(filterOptionsData.organisations, "data.data", []).forEach(
          (organisation: any) => {
            if (organisation.children) {
              values = [
                ...values,
                ...organisation.children.map((child: any) => child.code),
              ];
            }
          }
        );
        if (updatedSelectedFilters.organisations.length === values.length) {
          updatedSelectedFilters.organisations = [];
        } else {
          updatedSelectedFilters.organisations = [
            ...updatedSelectedFilters.organisations,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.SDGS:
        values = get(filterOptionsData.sdgs, "data.data.goals", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.sdg.length === values.length) {
          updatedSelectedFilters.sdg = [];
        } else {
          updatedSelectedFilters.sdg = [
            ...updatedSelectedFilters.sdg,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        values = get(filterOptionsData.activitystatus, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.activitystatus.length === values.length) {
          updatedSelectedFilters.activitystatus = [];
        } else {
          updatedSelectedFilters.activitystatus = [
            ...updatedSelectedFilters.activitystatus,
            ...values,
          ];
        }
        break;
      default:
        break;
    }
    setLocalSelectedFilters(updatedSelectedFilters);
  }

  function applyFilters() {
    setSelectedFilters(localSelectedFilters);
    setCurrentFilterOpen(FILTER_TYPES.NONE);
  }

  function resetFilters() {
    setLocalSelectedFilters(defaultfilters);
  }

  function backToMain() {
    setCurrentFilterOpen(FILTER_TYPES.MAIN);
  }

  function renderPanel() {
    switch (currentFilterOpen) {
      case FILTER_TYPES.MAIN:
        return (
          <ChooseAFilterPanel
            data={mainPanelData}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />
        );
      case FILTER_TYPES.THEMATIC_AREAS:
        return (
          <Filter
            title="Thematic Areas"
            data={get(filterOptionsData.thematicareas, "data.data", [])}
            renderSearch
            selection={mainPanelData[0].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.THEMATIC_AREAS)
            }
            selectedItems={localSelectedFilters.tag}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.THEMATIC_AREAS)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.COUNTRIES:
        return (
          <Filter
            title="Countries/Regions"
            data={[
              ...get(filterOptionsData.regions, "data.data", []),
              ...get(filterOptionsData.countries, "data.data", []),
            ]}
            renderSearch
            selection={mainPanelData[1].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.COUNTRIES)
            }
            selectedItems={[
              ...localSelectedFilters.countries,
              ...localSelectedFilters.regions,
            ]}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.COUNTRIES)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.SECTORS:
        return (
          <Filter
            title="Sector"
            data={get(filterOptionsData.sectors, "data.data", [])}
            renderSearch
            selection={mainPanelData[2].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.SECTORS)
            }
            selectedItems={localSelectedFilters.sectors}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.SECTORS)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ORGANISATIONS:
        return (
          <Filter
            title="Organisations"
            data={get(filterOptionsData.organisations, "data.data", [])}
            renderSearch
            selection={mainPanelData[3].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.ORGANISATIONS)
            }
            selectedItems={[
              ...localSelectedFilters.organisations,
              ...localSelectedFilters.organisationtypes,
            ]}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.ORGANISATIONS)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.SDGS:
        return (
          <Filter
            title="SDGs"
            data={get(filterOptionsData.sdgs, "data.data.goals", [])}
            renderSearch
            selection={mainPanelData[4].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.SDGS)
            }
            selectedItems={localSelectedFilters.sdg}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.SDGS)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ACTIVITY_STATUS:
        return (
          <Filter
            title="Activity Status"
            data={get(filterOptionsData.activitystatus, "data.data", [])}
            renderSearch
            selection={mainPanelData[5].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.ACTIVITY_STATUS)
            }
            selectedItems={localSelectedFilters.activitystatus}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.ACTIVITY_STATUS)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.PERIOD:
        return (
          <Filter
            title="Period"
            selection={mainPanelData[6].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.PERIOD)
            }
            selectedItems={localSelectedFilters.years}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.PERIOD)
            }
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ADVANCED_FILTERS:
        return (
          <Filter
            title="Advanced Filters"
            data={[]}
            selection={[]}
            selectedItems={[]}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.ADVANCED_FILTERS)
            }
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.ADVANCED_FILTERS)
            }
            onApplyFilters={backToMain}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      {currentFilterOpen !== FILTER_TYPES.NONE && (
        <div css={styles.container}>
          <Container maxWidth="lg" css={styles.muiContainer}>
            {renderPanel()}
          </Container>
        </div>
      )}
    </>
  );
};
