import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import remove from "lodash/remove";
import { useRecoilState } from "recoil";
import { Container } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import { getName } from "app/components/Charts/sdg";
import { useStoreState } from "app/state/store/hooks";
import { createStyles } from "app/components/FilterPanel/styles";
import { Filter } from "app/components/FilterPanel/Panels/Filter";
import { getTranslatedSDGS } from "app/components/Charts/sdg/translations";
import { ChooseAFilterPanel } from "app/components/FilterPanel/Panels/ChooseAFilterPanel";
import {
  getAdvancedFilterPanelData,
  getMainFilterPanelData,
} from "app/components/FilterPanel/utils";
import {
  defaultfilters,
  selectedFilterAtom,
  currentFilterOpenAtom,
  languageAtom,
} from "app/state/recoil/atoms";
import {
  FilterOption,
  FILTER_TYPES,
  FilterPanelProps,
  humanrightfilteroptions,
  MailPanelInitDataItemModel,
} from "app/components/FilterPanel/data";

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
  const [currentLanguage] = useRecoilState(languageAtom);
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

  React.useEffect(() => {
    if (currentFilterOpen === FILTER_TYPES.NONE) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [currentFilterOpen]);

  function onFilterCheckboxChange(param: string | string[], type: any): void {
    const value = param as string;
    const updatedSelectedFilters = { ...localSelectedFilters };
    switch (type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        console.log(param);
        if (typeof param === "string") {
          if (updatedSelectedFilters.tag.indexOf(value) > -1) {
            updatedSelectedFilters.tag = filter(
              updatedSelectedFilters.tag,
              (t: string) => t !== value
            );
          } else {
            updatedSelectedFilters.tag = [...updatedSelectedFilters.tag, value];
          }
        } else {
          let areParamValuesApplied = true;
          const fParam = filter(param, (p: string) => p !== "");
          fParam.forEach((pvalue: string) => {
            areParamValuesApplied =
              areParamValuesApplied &&
              updatedSelectedFilters.tag.indexOf(pvalue) > -1;
          });
          if (areParamValuesApplied) {
            updatedSelectedFilters.tag = filter(
              updatedSelectedFilters.tag,
              (t: string) => fParam.indexOf(t) === -1
            );
          } else {
            updatedSelectedFilters.tag = [
              ...updatedSelectedFilters.tag,
              ...fParam,
            ];
          }
        }
        break;
      case FILTER_TYPES.COUNTRIES:
        if (typeof param === "string") {
          const isRegion = !Number.isNaN(parseInt(value, 10));
          if (!isRegion) {
            if (updatedSelectedFilters.countries.indexOf(value) > -1) {
              updatedSelectedFilters.countries = filter(
                updatedSelectedFilters.countries,
                (t: string) => t !== value
              );
            } else {
              updatedSelectedFilters.countries = [
                ...updatedSelectedFilters.countries,
                value,
              ];
            }
          } else if (updatedSelectedFilters.regions.indexOf(value) > -1) {
            updatedSelectedFilters.regions = filter(
              updatedSelectedFilters.regions,
              (t: string) => t !== value
            );
          } else {
            updatedSelectedFilters.regions = [
              ...updatedSelectedFilters.regions,
              value,
            ];
          }
        } else {
          let areParamValuesApplied = true;
          const regions = filter(
            param,
            (pvalue: string) => !Number.isNaN(parseInt(pvalue, 10))
          );
          const countries = filter(
            param,
            (pvalue: string) =>
              Number.isNaN(parseInt(pvalue, 10)) && pvalue !== ""
          );
          countries.forEach((c: string) => {
            areParamValuesApplied =
              areParamValuesApplied &&
              updatedSelectedFilters.countries.indexOf(c) > -1;
          });
          regions.forEach((r: string) => {
            areParamValuesApplied =
              areParamValuesApplied &&
              updatedSelectedFilters.regions.indexOf(r) > -1;
          });
          if (areParamValuesApplied) {
            updatedSelectedFilters.countries = filter(
              updatedSelectedFilters.countries,
              (t: string) => countries.indexOf(t) === -1
            );
            updatedSelectedFilters.regions = filter(
              updatedSelectedFilters.regions,
              (t: string) => regions.indexOf(t) === -1
            );
          } else {
            updatedSelectedFilters.countries = [
              ...updatedSelectedFilters.countries,
              ...countries,
            ];
            updatedSelectedFilters.regions = [
              ...updatedSelectedFilters.regions,
              ...regions,
            ];
          }
        }
        break;
      case FILTER_TYPES.SECTORS:
        if (typeof param === "string") {
          if (updatedSelectedFilters.sectors.indexOf(value) > -1) {
            remove(updatedSelectedFilters.sectors, (t: string) => t === value);
          } else {
            updatedSelectedFilters.sectors = [
              ...updatedSelectedFilters.sectors,
              value,
            ];
          }
        } else {
          let areParamValuesApplied = true;
          param.forEach((pvalue: string) => {
            areParamValuesApplied =
              areParamValuesApplied &&
              updatedSelectedFilters.sectors.indexOf(pvalue) > -1;
          });
          if (areParamValuesApplied) {
            remove(
              updatedSelectedFilters.sectors,
              (t: string) => param.indexOf(t) > -1
            );
          } else {
            updatedSelectedFilters.sectors = [
              ...updatedSelectedFilters.sectors,
              ...param,
            ];
          }
        }
        break;
      case FILTER_TYPES.ORGANISATIONS:
        if (typeof param === "string") {
          if (updatedSelectedFilters.organisations.indexOf(value) > -1) {
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
        } else {
          let areParamValuesApplied = true;
          const orgType = find(param, (pvalue: string) => pvalue.length === 2);
          const onlyOrgs = filter(param, (pvalue: string) => pvalue.length > 2);
          onlyOrgs.forEach((org: string) => {
            areParamValuesApplied =
              areParamValuesApplied &&
              updatedSelectedFilters.organisations.indexOf(org) > -1;
          });
          if (areParamValuesApplied) {
            remove(
              updatedSelectedFilters.organisations,
              (t: string) => onlyOrgs.indexOf(t) > -1
            );
          } else {
            updatedSelectedFilters.organisations = [
              ...updatedSelectedFilters.organisations,
              ...onlyOrgs,
            ];
          }
          if (orgType) {
            if (
              updatedSelectedFilters.organisationtypes.indexOf(orgType) > -1
            ) {
              remove(
                updatedSelectedFilters.organisationtypes,
                (t: string) => t === orgType
              );
            } else {
              updatedSelectedFilters.organisationtypes = [
                ...updatedSelectedFilters.organisationtypes,
                orgType,
              ];
            }
          }
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
    let countryValues: string[] = [];
    let regionValues: string[] = [];
    switch (type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        get(filterOptionsData.thematicareas, "data.data", []).forEach(
          (thematicarea: any) => {
            if (thematicarea.children) {
              thematicarea.children.forEach((child: any) => {
                values = [...values, child.code];
              });
            }
          }
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
        get(filterOptionsData.locations, "data.data", []).forEach((l: any) => {
          if (l.children) {
            l.children.forEach((child: any) => {
              values = [...values, child.code];
            });
          }
        });
        countryValues = filter(values, (code: string) => code.length === 2);
        if (updatedSelectedFilters.countries.length === countryValues.length) {
          updatedSelectedFilters.countries = [];
        } else {
          updatedSelectedFilters.countries = [
            ...updatedSelectedFilters.countries,
            ...countryValues,
          ];
        }
        regionValues = filter(values, (code: string) => code.length === 3);
        if (updatedSelectedFilters.regions.length === regionValues.length) {
          updatedSelectedFilters.regions = [];
        } else {
          updatedSelectedFilters.regions = [
            ...updatedSelectedFilters.regions,
            ...regionValues,
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
        get(filterOptionsData.organisations, "data.data", []).forEach(
          (organisation: any) => {
            values = [...values, organisation.code];
            if (organisation.children) {
              organisation.children.forEach((child: any) => {
                values = [...values, child.code];
                if (child.children) {
                  child.children.forEach((gchild: any) => {
                    values = [...values, gchild.code];
                    if (gchild.children) {
                      gchild.children.forEach((ggchild: any) => {
                        values = [...values, ggchild.code];
                        if (ggchild.children) {
                          ggchild.children.forEach((gggchild: any) => {
                            values = [...values, gggchild.code];
                          });
                        }
                      });
                    }
                  });
                }
              });
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
        values = humanrightfilteroptions.map((value: any) => value.code);
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

  function resetAllFilters() {
    setSelectedFilters(defaultfilters);
    setLocalSelectedFilters(defaultfilters);
  }

  function filterTypeToObjectKeyMapping(filterType: FILTER_TYPES): string[] {
    switch (filterType) {
      case FILTER_TYPES.THEMATIC_AREAS:
        return ["tag"];
        break;
      case FILTER_TYPES.COUNTRIES:
        return ["countries", "regions"];
        break;
      case FILTER_TYPES.SECTORS:
        return ["sectors"];
        break;
      case FILTER_TYPES.ORGANISATIONS:
        return ["organisations"];
        break;
      case FILTER_TYPES.SDGS:
        return ["sdg"];
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        return ["activitystatus"];
        break;
      case FILTER_TYPES.POLICY_MARKERS:
        return ["policymarker"];
        break;
      case FILTER_TYPES.AID_TYPE:
        return ["defaultaidtype"];
        break;
      case FILTER_TYPES.BUDGET_LINES:
        return ["budgetlines"];
        break;
      case FILTER_TYPES.BI_MULTI:
        return ["collaborationtype"];
        break;
      case FILTER_TYPES.HUMAN_RIGHTS:
        return ["humanrights"];
        break;
      default:
        return [""];
        break;
    }
  }

  function resetFilter(filterType: FILTER_TYPES) {
    const keys = filterTypeToObjectKeyMapping(filterType);
    const updatedValues: any = {};

    keys.forEach((key) => {
      updatedValues[key] = [];
    });

    setLocalSelectedFilters({
      ...localSelectedFilters,
      ...updatedValues,
    });

    setMainPanelData(getMainFilterPanelData(localSelectedFilters, cmsData));
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

  function renderPanel(translatedPriorityAreas: { [key: string]: string }) {
    switch (currentFilterOpen) {
      case FILTER_TYPES.MAIN:
        return (
          <ChooseAFilterPanel
            data={mainPanelData}
            onCloseBtnClick={close}
            onApplyFilters={applyFilters}
            onResetFilters={resetAllFilters}
          />
        );
      case FILTER_TYPES.THEMATIC_AREAS:
        return (
          <Filter
            title={get(cmsData, "general.thematicareas", "Thematic Areas")}
            data={get(filterOptionsData.thematicareas, "data.data", []).map(
              (option: FilterOption) => {
                const firstChild = get(option.children, "[0]", null);
                if (firstChild) {
                  const translatedOptionName = get(
                    translatedPriorityAreas,
                    `${firstChild.code.split("|")[0].replace(/ /g, "")}`
                  );

                  const children = option.children?.map((child) => {
                    const name = () => {
                      if (child.name === "Main priority")
                        return get(
                          cmsData,
                          "priorityAreas.main",
                          "Main priority"
                        );
                      if (child.name === "Secondary priority")
                        return get(
                          cmsData,
                          "priorityAreas.secondary",
                          "Secondary priority"
                        );
                      return child.name;
                    };

                    return {
                      name: name(),
                      code: child.code,
                    };
                  });

                  return {
                    ...option,
                    children,
                    name: translatedOptionName,
                  };
                }
                return option;
              }
            )}
            renderSearch
            selection={mainPanelData[0].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.THEMATIC_AREAS)
            }
            selectedItems={localSelectedFilters.tag}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.THEMATIC_AREAS)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.THEMATIC_AREAS)}
          />
        );
      case FILTER_TYPES.COUNTRIES:
        return (
          <Filter
            title={get(cmsData, "viz.countriesregions", "Countries/Regions")}
            data={get(filterOptionsData.locations, "data.data", []).map(
              (region: any) => ({
                code: region.code,
                name: region[getName(currentLanguage)],
                children: region.children.map((country: any) => ({
                  code: country.code,
                  name: country[getName(currentLanguage)] || country.name,
                })),
              })
            )}
            renderSearch
            selection={mainPanelData[1].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
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
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.COUNTRIES)}
          />
        );
      case FILTER_TYPES.SECTORS:
        return (
          <Filter
            title={get(cmsData, "general.sectors", "Sectors")}
            data={get(filterOptionsData.sectors, "data.data", []).map(
              (category: any) => ({
                code: category.code,
                name: category[getName(currentLanguage)] || category.name,
                children: category.children.map((dac3: any) => ({
                  code: dac3.code,
                  name: dac3[getName(currentLanguage)] || dac3.name,
                  children: category.children.map((dac5: any) => ({
                    code: dac5.code,
                    name: dac5[getName(currentLanguage)] || dac5.name,
                  })),
                })),
              })
            )}
            renderSearch
            selection={mainPanelData[2].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.SECTORS)
            }
            selectedItems={localSelectedFilters.sectors}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.SECTORS)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.SECTORS)}
          />
        );
      case FILTER_TYPES.ORGANISATIONS:
        return (
          <Filter
            title={get(cmsData, "general.organisations", "Organisations")}
            data={get(filterOptionsData.organisations, "data.data", [])}
            renderSearch
            selection={mainPanelData[3].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.ORGANISATIONS)
            }
            selectedItems={localSelectedFilters.organisations}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.ORGANISATIONS)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.ORGANISATIONS)}
          />
        );
      case FILTER_TYPES.SDGS:
        return (
          <Filter
            title={get(cmsData, "general.sdgs", "SDGs")}
            data={get(filterOptionsData.sdgs, "data.data.goals", []).map(
              (option: FilterOption) => {
                if (currentLanguage === "en") return option;
                return {
                  ...option,
                  name: `${option.code}: ${getTranslatedSDGS(
                    currentLanguage,
                    parseInt(option.code, 10)
                  )}`,
                };
              }
            )}
            renderSearch
            selection={mainPanelData[4].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.SDGS)
            }
            selectedItems={localSelectedFilters.sdg}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.SDGS)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.SDGS)}
          />
        );
      case FILTER_TYPES.ACTIVITY_STATUS:
        return (
          <Filter
            title={get(cmsData, "filters.activitystatus", "Activity Status")}
            data={get(filterOptionsData.activitystatus, "data.data", [])}
            renderSearch
            selection={mainPanelData[5].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.ACTIVITY_STATUS)
            }
            selectedItems={localSelectedFilters.activitystatus}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.ACTIVITY_STATUS)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.ACTIVITY_STATUS)}
          />
        );
      case FILTER_TYPES.PERIOD:
        return (
          <Filter
            isPeriod
            title={get(cmsData, "filters.period", "Period")}
            selection={mainPanelData[6].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.PERIOD)
            }
            selectedItems={localSelectedFilters.years}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.PERIOD)
            }
            onBackBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.PERIOD)}
          />
        );
      case FILTER_TYPES.ADVANCED_FILTERS:
        return (
          <ChooseAFilterPanel
            data={advancedPanelData}
            onCloseBtnClick={backToMain}
            onApplyFilters={applyFilters}
            onResetFilters={resetAllFilters}
          />
        );
      case FILTER_TYPES.POLICY_MARKERS:
        return (
          <Filter
            title={get(cmsData, "filters.policymarkers", "Policy Markers")}
            data={get(filterOptionsData.policymarkers, "data.data", [])}
            renderSearch
            selection={advancedPanelData[0].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.POLICY_MARKERS)
            }
            selectedItems={localSelectedFilters.policymarker}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.POLICY_MARKERS)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.POLICY_MARKERS)}
          />
        );
      case FILTER_TYPES.AID_TYPE:
        return (
          <Filter
            title={get(cmsData, "filters.typeofaid", "Type of aid")}
            data={get(filterOptionsData.aidtypes, "data.data", [])}
            renderSearch
            selection={advancedPanelData[1].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.AID_TYPE)
            }
            selectedItems={localSelectedFilters.defaultaidtype}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.AID_TYPE)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.AID_TYPE)}
          />
        );
      case FILTER_TYPES.BUDGET_LINES:
        return (
          <Filter
            title={get(cmsData, "general.budgetlines", "Budget lines")}
            data={get(filterOptionsData.budgetlines, "data.data", [])}
            renderSearch
            selection={advancedPanelData[2].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.BUDGET_LINES)
            }
            selectedItems={localSelectedFilters.budgetlines}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.BUDGET_LINES)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.BUDGET_LINES)}
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
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.BI_MULTI)
            }
            selectedItems={localSelectedFilters.collaborationtype}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.BI_MULTI)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.BI_MULTI)}
          />
        );
      case FILTER_TYPES.HUMAN_RIGHTS:
        return (
          <Filter
            title={get(cmsData, "general.humanrights", "Human rights approach")}
            data={humanrightfilteroptions}
            renderSearch
            selection={advancedPanelData[4].selection}
            onFilterCheckboxChange={(value: string | string[]) =>
              onFilterCheckboxChange(value, FILTER_TYPES.HUMAN_RIGHTS)
            }
            selectedItems={localSelectedFilters.humanrights}
            onSelectAllCheckboxChange={() =>
              onSelectAllCheckboxChange(FILTER_TYPES.HUMAN_RIGHTS)
            }
            onBackBtnClick={backToAdvanced}
            onApplyFilters={applyFilters}
            onResetFilter={() => resetFilter(FILTER_TYPES.HUMAN_RIGHTS)}
          />
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      {currentFilterOpen !== FILTER_TYPES.NONE && (
        <aside css={styles.container}>
          <Container maxWidth="lg" css={styles.muiContainer}>
            {renderPanel(cmsData.priorityAreas)}
          </Container>
        </aside>
      )}
    </>
  );
};
