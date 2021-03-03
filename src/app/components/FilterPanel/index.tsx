import React from "react";
import get from "lodash/get";
import remove from "lodash/remove";
import { useRecoilState } from "recoil";
import { Container } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
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
  humanrightfilteroptions,
  MailPanelInitDataItemModel,
} from "app/components/FilterPanel/data";
import {
  getMainFilterPanelData,
  getAdvancedFilterPanelData,
} from "app/components/FilterPanel/utils";
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
  const cmsData = useCMSData({ returnData: true });
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
  const [advancedPanelData, setAdvancedPanelData] = React.useState<
    MailPanelInitDataItemModel[]
  >([]);

  React.useEffect(() => {
    setMainPanelData(getMainFilterPanelData(localSelectedFilters, cmsData));
    setAdvancedPanelData(
      getAdvancedFilterPanelData(localSelectedFilters, cmsData)
    );
  }, [localSelectedFilters, cmsData]);

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
      case FILTER_TYPES.POLICY_MARKERS:
        if (updatedSelectedFilters.policymarker.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.policymarker,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.policymarker = [
            ...updatedSelectedFilters.policymarker,
            value,
          ];
        }
        break;
      case FILTER_TYPES.AID_TYPE:
        if (updatedSelectedFilters.defaultaidtype.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.defaultaidtype,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.defaultaidtype = [
            ...updatedSelectedFilters.defaultaidtype,
            value,
          ];
        }
        break;
      case FILTER_TYPES.BUDGET_LINES:
        if (updatedSelectedFilters.budgetlines.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.budgetlines,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.budgetlines = [
            ...updatedSelectedFilters.budgetlines,
            value,
          ];
        }
        break;
      case FILTER_TYPES.BI_MULTI:
        if (updatedSelectedFilters.collaborationtype.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.collaborationtype,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.collaborationtype = [
            ...updatedSelectedFilters.collaborationtype,
            value,
          ];
        }
        break;
      case FILTER_TYPES.HUMAN_RIGHTS:
        if (updatedSelectedFilters.humanrights.indexOf(value) > -1) {
          remove(
            updatedSelectedFilters.humanrights,
            (t: string) => t === value
          );
        } else {
          updatedSelectedFilters.humanrights = [
            ...updatedSelectedFilters.humanrights,
            value,
          ];
        }
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
      case FILTER_TYPES.POLICY_MARKERS:
        values = get(filterOptionsData.policymarkers, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.policymarker.length === values.length) {
          updatedSelectedFilters.policymarker = [];
        } else {
          updatedSelectedFilters.policymarker = [
            ...updatedSelectedFilters.policymarker,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.AID_TYPE:
        values = get(filterOptionsData.aidtypes, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.defaultaidtype.length === values.length) {
          updatedSelectedFilters.defaultaidtype = [];
        } else {
          updatedSelectedFilters.defaultaidtype = [
            ...updatedSelectedFilters.defaultaidtype,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.BUDGET_LINES:
        values = get(filterOptionsData.budgetlines, "data.data", []).map(
          (value: any) => value.code
        );
        if (updatedSelectedFilters.budgetlines.length === values.length) {
          updatedSelectedFilters.budgetlines = [];
        } else {
          updatedSelectedFilters.budgetlines = [
            ...updatedSelectedFilters.budgetlines,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.BI_MULTI:
        values = ["1", "2"];
        if (updatedSelectedFilters.collaborationtype.length === values.length) {
          updatedSelectedFilters.collaborationtype = [];
        } else {
          updatedSelectedFilters.collaborationtype = [
            ...updatedSelectedFilters.collaborationtype,
            ...values,
          ];
        }
        break;
      case FILTER_TYPES.HUMAN_RIGHTS:
        if (
          updatedSelectedFilters.humanrights.length ===
          humanrightfilteroptions.length
        ) {
          updatedSelectedFilters.humanrights = [];
        } else {
          updatedSelectedFilters.humanrights = [
            ...updatedSelectedFilters.humanrights,
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

  function close() {
    setCurrentFilterOpen(FILTER_TYPES.NONE);
  }

  function backToMain() {
    setCurrentFilterOpen(FILTER_TYPES.MAIN);
  }

  function backToAdvanced() {
    setCurrentFilterOpen(FILTER_TYPES.ADVANCED_FILTERS);
  }

  function renderPanel() {
    switch (currentFilterOpen) {
      case FILTER_TYPES.MAIN:
        return (
          <ChooseAFilterPanel
            data={mainPanelData}
            onCloseBtnClick={close}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />
        );
      case FILTER_TYPES.THEMATIC_AREAS:
        return (
          <Filter
            title={get(cmsData, "general.thematicareas", "Thematic Areas")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.COUNTRIES:
        return (
          <Filter
            title={get(cmsData, "viz.countriesregions", "Countries/Regions")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.SECTORS:
        return (
          <Filter
            title={get(cmsData, "general.sectors", "Sectors")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ORGANISATIONS:
        return (
          <Filter
            title={get(cmsData, "general.organisations", "Organisations")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.SDGS:
        return (
          <Filter
            title={get(cmsData, "general.sgds", "SDGs")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ACTIVITY_STATUS:
        return (
          <Filter
            title={get(cmsData, "filters.activitystatus", "Activity Status")}
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
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.PERIOD:
        return (
          <Filter
            isPeriod
            title={get(cmsData, "filters.period", "Period")}
            selection={mainPanelData[6].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.PERIOD)
            }
            selectedItems={localSelectedFilters.years}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.PERIOD)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={backToMain}
          />
        );
      case FILTER_TYPES.ADVANCED_FILTERS:
        return (
          <ChooseAFilterPanel
            data={advancedPanelData}
            onCloseBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />
        );
      case FILTER_TYPES.POLICY_MARKERS:
        return (
          <Filter
            title={get(cmsData, "filters.policymarkers", "Policy Markers")}
            data={get(filterOptionsData.policymarkers, "data.data", [])}
            renderSearch
            selection={advancedPanelData[0].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.POLICY_MARKERS)
            }
            selectedItems={localSelectedFilters.policymarker}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.POLICY_MARKERS)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={backToAdvanced}
          />
        );
      case FILTER_TYPES.AID_TYPE:
        return (
          <Filter
            title={get(cmsData, "filters.typeofaid", "Type of aid")}
            data={get(filterOptionsData.aidtypes, "data.data", [])}
            renderSearch
            selection={advancedPanelData[1].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.AID_TYPE)
            }
            selectedItems={localSelectedFilters.defaultaidtype}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.AID_TYPE)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={backToAdvanced}
          />
        );
      case FILTER_TYPES.BUDGET_LINES:
        return (
          <Filter
            title={get(cmsData, "general.budgetlines", "Budget lines")}
            data={get(filterOptionsData.budgetlines, "data.data.data", [])}
            renderSearch
            selection={advancedPanelData[2].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.BUDGET_LINES)
            }
            selectedItems={localSelectedFilters.budgetlines}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.BUDGET_LINES)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={backToAdvanced}
          />
        );
      case FILTER_TYPES.BI_MULTI:
        return (
          <Filter
            title={get(cmsData, "general.bimulti", "Bi/Multi")}
            data={[
              {
                name: "Bi",
                code: "1",
              },
              {
                name: "Multi",
                code: "2",
              },
            ]}
            renderSearch
            selection={advancedPanelData[3].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.BI_MULTI)
            }
            selectedItems={localSelectedFilters.collaborationtype}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.BI_MULTI)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={backToAdvanced}
          />
        );
      case FILTER_TYPES.HUMAN_RIGHTS:
        return (
          <Filter
            title={get(cmsData, "general.humanrights", "Human rights approach")}
            data={humanrightfilteroptions}
            renderSearch
            selection={advancedPanelData[4].selection}
            onFilterCheckboxChange={(value: string) =>
              onFilterCheckboxChange(value, FILTER_TYPES.HUMAN_RIGHTS)
            }
            selectedItems={localSelectedFilters.humanrights}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.HUMAN_RIGHTS)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={backToAdvanced}
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
