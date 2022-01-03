/* eslint-disable no-nested-ternary */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import Grid from "@material-ui/core/Grid";
import { VizTabs } from "app/components/VizTabs";
import { useMediaQuery } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import { DataTable } from "app/components/Charts/table";
import { VizLoader } from "app/modules/common/viz-loader";
import { VizSidePanel } from "app/components/VizSidePanel";
import { MoreButton } from "app/components/Charts/bar/data";
import {
  useMeasure,
  useUnmount,
  useDebounce,
  useUpdateEffect,
} from "react-use";
import { ODAvizModule } from "app/components/Charts/modules/oda";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { getSidebarLegendItems } from "app/modules/viz-module/utils";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { SectorsVizModule } from "app/components/Charts/modules/sectors";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ProjectsListModule } from "app/components/Charts/modules/projects";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import {
  BudgetLinesModule,
  formatDataForViz,
} from "app/components/Charts/modules/budgetlines";
import { FloatingButtons } from "app/modules/viz-module/common/FloatingButtons";
import { CountriesRegionsModule } from "app/components/Charts/modules/locations";
import { OrganisationsModule } from "app/components/Charts/modules/organisations";
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";
import {
  thematicAreasDataTableOptions,
  thematicAreasDataTableColumns,
} from "app/components/Charts/thematicareas/data";
import {
  selectedFilterAtom,
  ODAlatestFiltersAtom,
  ThematicAreasLatestFiltersAtom,
  SectorsSunburstLatestFiltersAtom,
  LocationsTreemapLatestFiltersAtom,
  OrganisationsLatestFiltersAtom,
  BudgetLinesLatestFiltersAtom,
  ProjectsLatestFiltersAtom,
  prevLocationAtom,
  languageAtom,
  filterbarHeightAtom,
} from "app/state/recoil/atoms";

export default function VizModule() {
  const location = useLocation();
  const { params } = useRouteMatch();
  const cmsData = useCMSData({ returnData: true });
  const mobile = useMediaQuery("(max-width: 600px)");
  const [searchKey, setSearchKey] = React.useState(
    sessionStorage.getItem("searchValue") || ""
  );
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const [activeTab, setActiveTab] = React.useState("chart");
  const [expandedVizItem, setExpandedVizItem] = React.useState<
    string | number | null
  >(null);
  const [selectedVizItem, setSelectedVizItem] = React.useState<
    string | number | null
  >(null);
  const isProjects = get(params, "tab", "") === "projects";
  const isThematic = get(params, "tab", "") === "thematic-areas";
  const isBudgetLines = get(params, "tab", "") === "budget-lines";

  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizCompData, setVizCompData] = React.useState<any[]>([]);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [sectorDrillDown, setSectorDrillDown] = React.useState("");
  const [prevTab, setPrevTab] = React.useState(get(params, "tab", ""));
  const [currentLanguage] = useRecoilState(languageAtom);
  const [selectedFilters] = useRecoilState(selectedFilterAtom);
  const [filterbarHeight, setFilterbarHeight] = useRecoilState(
    filterbarHeightAtom
  );
  const [ODAlatestFilters, setODAlatestFilters] = useRecoilState(
    ODAlatestFiltersAtom
  );
  const [
    ThematicAreasLatestFilters,
    setThematicAreasLatestFilters,
  ] = useRecoilState(ThematicAreasLatestFiltersAtom);
  const [
    SectorsSunburstLatestFilters,
    setSectorsSunburstLatestFilters,
  ] = useRecoilState(SectorsSunburstLatestFiltersAtom);
  const [
    LocationsTreemapLatestFilters,
    setLocationsTreemapLatestFilters,
  ] = useRecoilState(LocationsTreemapLatestFiltersAtom);
  const [
    OrganisationsLatestFilters,
    setOrganisationsLatestFilters,
  ] = useRecoilState(OrganisationsLatestFiltersAtom);
  const [
    BudgetLinesLatestFilters,
    setBudgetLinesLatestFilters,
  ] = useRecoilState(BudgetLinesLatestFiltersAtom);
  const [ProjectsLatestFilters, setProjectsLatestFilters] = useRecoilState(
    ProjectsLatestFiltersAtom
  );
  const projectListPage = useStoreState((state) => state.projectListPage.value);
  const setProjectListPage = useStoreActions(
    (actions) => actions.projectListPage.setValue
  );
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationAtom);

  /* STATE & ACTIONS */
  const odaBarChartAction = useStoreActions(
    (actions) => actions.odaBarChart.fetch
  );
  const odaBarChartData = useStoreState((state) =>
    get(state.odaBarChart, "data.vizData", [])
  );
  const thematicAreasChartAction = useStoreActions(
    (actions) => actions.thematicAreasChart.fetch
  );
  const thematicAreasChartData = useStoreState((state) =>
    get(state.thematicAreasChart, "data.vizData", [])
  );
  const sectorsSunburstAction = useStoreActions(
    (actions) => actions.sectorsSunburst.fetch
  );
  const sectorsSunburstDataCount = useStoreState((state) =>
    get(state.sectorsSunburst, "data.count", 0)
  );
  const sectorsSunburstData = useStoreState((state) =>
    get(state.sectorsSunburst, "data.vizData", { children: [] })
  );
  const locationsTreemapAction = useStoreActions(
    (actions) => actions.locationsTreemap.fetch
  );
  const locationsTreemapData = useStoreState((state) =>
    get(state.locationsTreemap, "data.vizData", {
      name: "",
      color: "",
      children: [],
    })
  );
  const organisationsTreemapAction = useStoreActions(
    (actions) => actions.organisationsTreemap.fetch
  );
  const organisationsTreemapData = useStoreState((state) =>
    get(state.organisationsTreemap, "data.vizData", {
      name: "",
      color: "",
      children: [],
    })
  );
  const budgetLinesBarChartAction = useStoreActions(
    (actions) => actions.budgetLinesBarChart.fetch
  );
  const budgetLinesBarChartData = useStoreState((state) =>
    formatDataForViz(
      get(state.budgetLinesBarChart, "data.vizData", []),
      currentLanguage
    )
  );
  const odaBudgetLinesChartAction = useStoreActions(
    (actions) => actions.odaBudgetLinesChart.fetch
  );
  const odaBudgetLinesChartClearAction = useStoreActions(
    (actions) => actions.odaBudgetLinesChart.clear
  );
  const odaBudgetLinesChartData = useStoreState((state) =>
    get(state.odaBudgetLinesChart, "data.vizData", [])
  );
  const odaBudgetLinesChartLoading = useStoreState(
    (state) => state.odaBudgetLinesChart.loading
  );
  const projectsAction = useStoreActions((actions) => actions.activities.fetch);
  const projectsData = useStoreState((state) =>
    get(state.activities, "data.data", [])
  );
  const projectsCountData = useStoreState((state) =>
    get(state.activities, "data.count", [])
  );

  const vizDataLoading = useStoreState((state) => ({
    oda: state.odaBarChart.loading,
    thematic: state.thematicAreasChart.loading,
    sectors: state.sectorsSunburst.loading,
    locations: state.locationsTreemap.loading,
    organisations: state.organisationsTreemap.loading,
    projects: state.activities.loading,
    budgetLines: state.budgetLinesBarChart.loading,
    sdg: state.sdgViz.loading,
    geo: state.geoMap.loading,
  }));

  function loadMoreProjects() {
    const filters = getAPIFormattedFilters(selectedFilters);
    if (projectsCountData > projectListPage * 10) {
      projectsAction({
        addOnData: true,
        values: {
          filters,
          search: searchKey,
          lang: currentLanguage,
          page: projectListPage + 1,
        },
      });
      setProjectListPage(projectListPage + 1);
    }
  }

  function onSelectChange(e: {
    selection: string | number | null;
    translation: { x: number; y: number };
  }) {
    setVizLevel(1);
    setVizScale(1);
    setExpandedVizItem(e.selection);
    setVizTranslation(e.translation);
  }

  function onZoomIn() {
    if (expandedVizItem) {
      // do api call to get level 1 data based on selection
    }
  }

  function onZoomOut() {
    setVizLevel(0);
    setVizScale(1);
    setSectorDrillDown("");
    setExpandedVizItem(null);
    setVizTranslation({ x: 0, y: 0 });
  }

  function onZoomInLevelSelectorChange(item: string) {
    const fVizCompData = find(
      vizCompData,
      (d: any) => d.data.indexValue.toString() === item
    );
    setVizScale(1);
    setVizTranslation({
      x: get(fVizCompData, "x", 50) * -1 + 50,
      y: 0,
    });
    setExpandedVizItem(item);
  }

  function onSectorSelectChange(selection: string) {
    if (selection === "") {
      setVizLevel(0);
      setVizScale(1);
      setSectorDrillDown("");
    } else {
      setVizLevel(1);
      setVizScale(0.3);
      setSectorDrillDown(selection);
    }
  }

  function onTabChange(tab: string) {
    switch (tab) {
      case "oda":
        setODAlatestFilters(selectedFilters);
        break;
      case "thematic-areas":
        setThematicAreasLatestFilters(selectedFilters);
        break;
      case "sectors":
        setSectorsSunburstLatestFilters(selectedFilters);
        break;
      case "countries-regions":
        setLocationsTreemapLatestFilters(selectedFilters);
        break;
      case "organisations":
        setOrganisationsLatestFilters(selectedFilters);
        break;
      case "budget-lines":
        setBudgetLinesLatestFilters(selectedFilters);
        break;
      case "projects":
        setProjectsLatestFilters(selectedFilters);
        break;
      default:
        break;
    }
    setPrevTab(get(params, "tab", ""));
  }

  function getActiveVizData() {
    const viz = get(params, "tab", "");
    const data = {
      oda: odaBarChartData,
      "thematic-areas": thematicAreasChartData,
      sectors: sectorsSunburstData,
      "countries-regions": locationsTreemapData,
      organisations: organisationsTreemapData,
      "budget-lines": budgetLinesBarChartData,
      projects: projectsData,
    };
    return get(data, viz, []);
  }

  React.useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.background = "#fff";
    }
  }, []);

  React.useEffect(() => {
    setVizLevel(0);
    setVizScale(1);
    setSelectedVizItem(null);
    setExpandedVizItem(null);
    onTabChange(prevTab);
    setActiveTab("chart");
    setProjectListPage(0);

    const filters = getAPIFormattedFilters(selectedFilters);
    switch (get(params, "tab", "")) {
      case "oda":
        if (
          odaBarChartData.length === 0 ||
          !isEqual(ODAlatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          odaBarChartAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "thematic-areas":
        if (
          thematicAreasChartData.length === 0 ||
          !isEqual(ThematicAreasLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          thematicAreasChartAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "sectors":
        if (
          sectorsSunburstData.children.length === 0 ||
          !isEqual(SectorsSunburstLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          sectorsSunburstAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "countries-regions":
        if (
          locationsTreemapData.children.length === 0 ||
          !isEqual(LocationsTreemapLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          locationsTreemapAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "organisations":
        if (
          organisationsTreemapData.children.length === 0 ||
          !isEqual(OrganisationsLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          organisationsTreemapAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "budget-lines":
        if (
          budgetLinesBarChartData.length === 0 ||
          !isEqual(BudgetLinesLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          budgetLinesBarChartAction({
            values: {
              filters,
            },
          });
        }
        break;
      case "projects":
        if (
          projectsData.length === 0 ||
          !isEqual(ProjectsLatestFilters, selectedFilters) ||
          prevLocation !== ""
        ) {
          projectsAction({
            values: {
              filters,
              page: 0,
              search: searchKey,
              lang: currentLanguage,
            },
          });
        }
        break;
      default:
        break;
    }
  }, [selectedFilters, get(params, "tab", ""), prevLocation]);

  useUnmount(() => {
    setPrevLocation("");
    onTabChange(get(params, "tab", ""));
    const root = document.getElementById("root");
    if (root) {
      root.style.background = "";
    }
  });

  useUpdateEffect(() => {
    const filters = getAPIFormattedFilters(selectedFilters);
    projectsAction({
      values: {
        filters,
        page: 0,
        search: searchKey,
        lang: currentLanguage,
      },
    });
    setProjectListPage(0);
  }, [currentLanguage]);

  React.useEffect(() => {
    if (selectedVizItem === null && expandedVizItem === null) {
      setVizLevel(0);
      setVizScale(1);
      setVizTranslation({ x: 0, y: 0 });
    }
    if (expandedVizItem && get(params, "tab", "") === "oda" && vizLevel > 0) {
      const filters = getAPIFormattedFilters(selectedFilters);
      odaBudgetLinesChartAction({
        values: {
          filters: {
            ...filters,
            years: [`${expandedVizItem}`, `${expandedVizItem}`],
          },
          extra_param: "simple-budgetlines-bar",
        },
      });
    }
    if (
      !expandedVizItem &&
      get(params, "tab", "") === "oda" &&
      odaBudgetLinesChartData.length > 0
    ) {
      odaBudgetLinesChartClearAction();
    }
  }, [selectedVizItem, expandedVizItem]);

  React.useEffect(() => {
    setActiveTab(sectorDrillDown.length > 0 ? "table" : "chart");
  }, [sectorDrillDown]);

  useDebounce(
    () => {
      const filters = getAPIFormattedFilters(selectedFilters);
      sessionStorage.setItem("searchValue", searchKey);
      setProjectListPage(0);
      projectsAction({
        values: {
          filters,
          page: 0,
          search: searchKey,
          lang: currentLanguage,
        },
      });
    },
    500,
    [searchKey]
  );

  React.useEffect(() => {
    if (activeTab === "chart") {
      setSectorDrillDown("");
    }
  }, [activeTab]);

  let thematicAreaChartSingle = false;
  if (selectedFilters.tag.length > 0) {
    if (selectedFilters.tag.length === 1) {
      thematicAreaChartSingle = true;
    } else if (selectedFilters.tag.length === 2) {
      const splits = [
        selectedFilters.tag[0].split("|"),
        selectedFilters.tag[1].split("|"),
      ];
      thematicAreaChartSingle = splits[0][0] === splits[1][0];
    }
  }

  const hideODAGNI = () => {
    const currentURLParams = new URLSearchParams(location.search);
    const countries = currentURLParams.get("recipient_country_code");
    const regions = currentURLParams.get("recipient_region_code");
    const sectors = currentURLParams.get("sector_code");
    const organisations = currentURLParams.get("participating_org_ref");
    const activitystatus = currentURLParams.get("activity_status_code");
    const activityscope = currentURLParams.get("activity_scope_code");
    const tag = currentURLParams.get("tag_narrative");
    const sdg = currentURLParams.get("tag_code");
    const defaultaidtype = currentURLParams.get("default_aid_type_code");
    const defaulttiedstatus = currentURLParams.get("default_tied_status_code");
    const defaultflowtype = currentURLParams.get("default_flow_type_code");
    const collaborationtype = currentURLParams.get("collaboration_type_code");
    const policymarker = currentURLParams.get("policy_marker_code");
    const budgetlines = currentURLParams.get("budget_line");
    const humanrights = currentURLParams.get("human_rights_approach");
    const years = currentURLParams.get("years");
    const hasValue =
      countries ||
      regions ||
      sectors ||
      organisations ||
      activitystatus ||
      activityscope ||
      tag ||
      sdg ||
      defaultaidtype ||
      defaulttiedstatus ||
      defaultflowtype ||
      collaborationtype ||
      policymarker ||
      budgetlines ||
      humanrights ||
      years;

    return hasValue !== null;
  };

  function renderSideList() {
    if ((mobile && isThematic) || isProjects) {
      return <></>;
    }
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        xl={4}
        css={`
          z-index: 1;
          @media (min-width: 600px) {
            box-shadow: 200px 0px 0px 0px #f8f8f8, 400px 0px 0px 0px #f8f8f8,
              600px 0px 0px 0px #f8f8f8, 800px 0px 0px 0px #f8f8f8,
              1000px 0px 0px 0px #f8f8f8, 1200px 0px 0px 0px #f8f8f8,
              1400px 0px 0px 0px #f8f8f8, 1600px 0px 0px 0px #f8f8f8,
              1800px 0px 0px 0px #f8f8f8;
          }
        `}
      >
        <div
          ref={ref}
          css={`
            width: 100%;
            height: 100%;
            display: flex;
            background: ${PrimaryColor[1]};

            ${vizLevel > 0 && !isBudgetLines
              ? ` 
                  #legend-items { 
                    * { 
                      opacity: 1; 
                      pointer-events: none; 
                    }   
                  } 
                `
              : ""}
          `}
        >
          <VizSidePanel
            items={getSidebarLegendItems(
              expandedVizItem &&
                get(params, "tab", "") === "oda" &&
                vizLevel > 0
                ? "oda-drilldown"
                : get(params, "tab", ""),
              {
                oda: odaBarChartData,
                "oda-drilldown": odaBudgetLinesChartData,
                "thematic-areas": thematicAreasChartData,
                sectors: sectorsSunburstData,
                "countries-regions": locationsTreemapData,
                organisations: organisationsTreemapData,
                "budget-lines": budgetLinesBarChartData,
              },
              selectedVizItem,
              cmsData,
              thematicAreaChartSingle,
              hideODAGNI(),
              currentLanguage
            )}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scrollableHeight={height}
            vizType={get(params, "tab", "")}
            setSelected={setSelectedVizItem}
            setExpanded={setExpandedVizItem}
            selectedVizItem={selectedVizItem}
            expandedVizItem={expandedVizItem}
          />
        </div>
      </Grid>
    );
  }

  return (
    <Grid
      container
      item
      css={`
        //margin-top: -16px;
        //100vh - filterbar + appbar
        height: calc(100vh - (${filterbarHeight}px + 68px));
        @media (max-width: 600px) {
          height: calc(100vh - (${filterbarHeight}px + 56px));
        } ;
      `}
    >
      <VizTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Grid
        container
        id="image-container"
        css={`
          z-index: 1;
          padding: 0 68px;
          height: calc(100% - 88px);
          @media (max-width: 992px) {
            padding: 0 12px;
          }

          @media (max-width: 600px) {
            //padding: 0;
          }
        `}
      >
        <Grid
          item
          css={`
            background: #fff;
            height: fit-content;
          `}
          xs={12}
          sm={12}
          md={isProjects ? 12 : 8}
          lg={isProjects ? 12 : 8}
          xl={isProjects ? 12 : 8}
        >
          {!isProjects && activeTab !== "table" && !mobile && (
            <FloatingButtons
              data={getActiveVizData()}
              viz={get(params, "tab", "")}
            />
          )}
          <Switch>
            <Route path="/:lang/viz/oda">
              {vizDataLoading.oda ? (
                <VizLoader dataCy="oda-loader" loading={vizDataLoading.oda} />
              ) : (
                <ODAvizModule
                  vizScale={vizScale}
                  vizLevel={vizLevel}
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  data={odaBarChartData}
                  vizCompData={vizCompData}
                  scrollableHeight={height - 56}
                  setVizCompData={setVizCompData}
                  onSelectChange={onSelectChange}
                  vizTranslation={vizTranslation}
                  currentLanguage={currentLanguage}
                  selectedVizItemId={expandedVizItem}
                  setSelectedVizItem={setExpandedVizItem}
                  onArrowSelectChange={onZoomInLevelSelectorChange}
                  odaBudgetLinesChartData={odaBudgetLinesChartData}
                  odaBudgetLinesChartLoading={odaBudgetLinesChartLoading}
                  activeTabData={getActiveVizData()}
                />
              )}
            </Route>
            <Route path="/:lang/viz/thematic-areas">
              {vizDataLoading.thematic ? (
                <VizLoader
                  dataCy="thematic-loader"
                  loading={vizDataLoading.thematic}
                />
              ) : activeTab === "chart" ? (
                <>
                  <div css="width: 100%;height: 100px;" />
                  <ThematicAreas
                    linkedLabels
                    showOnlyViz={false}
                    data={thematicAreasChartData}
                    selectedVizItemId={selectedVizItem}
                    setSelectedVizItem={setSelectedVizItem}
                    showSingleCircle={thematicAreaChartSingle}
                  />
                </>
              ) : (
                <div
                  css={`
                    padding: 24px 24px 24px 0;

                    @media (max-width: 600px) {
                      max-height: 100%;
                      padding: 0;
                    }
                  `}
                >
                  <DataTable
                    data={(thematicAreaChartSingle
                      ? thematicAreasChartData.slice(0, 1)
                      : thematicAreasChartData
                    ).map((item: any) => ({
                      ...item,
                      area: get(
                        cmsData.priorityAreas,
                        `${item.ref.split("|")[0].replace(/ /g, "")}`,
                        item.area
                      ),
                    }))}
                    options={{
                      ...thematicAreasDataTableOptions,
                      customToolbar: () => (
                        <MoreButton data={getActiveVizData()} params={params} />
                      ),
                    }}
                    columns={getTranslatedCols(
                      thematicAreasDataTableColumns,
                      cmsData
                    )}
                    title={`${thematicAreasChartData.length} ${get(
                      cmsData,
                      "general.thematicareas",
                      "thematic areas"
                    ).toLowerCase()}`}
                  />
                </div>
              )}
            </Route>
            <Route path="/:lang/viz/sectors">
              {vizDataLoading.sectors ? (
                <VizLoader
                  dataCy="sectors-loader"
                  loading={vizDataLoading.sectors}
                />
              ) : (
                <SectorsVizModule
                  vizLevel={vizLevel}
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  data={sectorsSunburstData}
                  scrollableHeight={height - 56}
                  sectorDrillDown={sectorDrillDown}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                  activitiesCount={sectorsSunburstDataCount}
                  onSectorSelectChange={onSectorSelectChange}
                  clearSectorDrillDown={() => setSectorDrillDown("")}
                  getActiveTabData={getActiveVizData}
                />
              )}
            </Route>
            <Route path="/:lang/viz/countries-regions">
              {vizDataLoading.locations ? (
                <VizLoader
                  dataCy="locations-loader"
                  loading={vizDataLoading.locations}
                />
              ) : (
                <CountriesRegionsModule
                  label=""
                  activeTab={activeTab}
                  data={locationsTreemapData}
                  scrollableHeight={height - 56}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                  getActiveTabData={getActiveVizData}
                />
              )}
            </Route>
            <Route path="/:lang/viz/organisations">
              {vizDataLoading.organisations ? (
                <VizLoader
                  dataCy="orgs-loader"
                  loading={vizDataLoading.organisations}
                />
              ) : (
                <OrganisationsModule
                  label=""
                  activeTab={activeTab}
                  scrollableHeight={height - 56}
                  data={organisationsTreemapData}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                  getActiveTabData={getActiveVizData}
                />
              )}
            </Route>
            <Route path="/:lang/viz/budget-lines">
              {vizDataLoading.budgetLines ? (
                <VizLoader
                  dataCy="budgetlines-loader"
                  loading={vizDataLoading.budgetLines}
                />
              ) : (
                <BudgetLinesModule
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  vizCompData={vizCompData}
                  scrollableHeight={height - 56}
                  data={budgetLinesBarChartData}
                  setVizCompData={setVizCompData}
                  onSelectChange={onSelectChange}
                  selectedVizItemId={expandedVizItem}
                  setSelectedVizItem={setExpandedVizItem}
                  getActiveTabData={getActiveVizData}
                />
              )}
            </Route>
            <Route path="/:lang/viz/projects">
              <ProjectsListModule
                searchKey={searchKey}
                projects={projectsData}
                count={projectsCountData}
                loadMore={loadMoreProjects}
                setSearchKey={setSearchKey}
                loading={vizDataLoading.projects}
              />
            </Route>
          </Switch>
        </Grid>
        {renderSideList()}
      </Grid>
    </Grid>
  );
}
