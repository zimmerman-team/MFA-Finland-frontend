/* eslint-disable no-nested-ternary */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import Grid from "@material-ui/core/Grid";
import { useMeasure, useUnmount } from "react-use";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";

import { PrimaryColor } from "app/theme";
import { BarItemProps } from "@nivo/bar";
import { VizTabs } from "app/components/VizTabs";
import { DataTable } from "app/components/Charts/table";
import { VizLoader } from "app/modules/common/viz-loader";
import { VizSidePanel } from "app/components/VizSidePanel";
import { ODAvizModule } from "app/components/Charts/modules/oda";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { getSidebarLegendItems } from "app/modules/viz-module/utils";
import { SectorsVizModule } from "app/components/Charts/modules/sectors";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ProjectsListModule } from "app/components/Charts/modules/projects";
import { BudgetLinesModule } from "app/components/Charts/modules/budgetlines";
import { CountriesRegionsModule } from "app/components/Charts/modules/locations";
import { OrganisationsModule } from "app/components/Charts/modules/organisations";
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
} from "app/state/recoil/atoms";

export default function VizModule() {
  const { params } = useRouteMatch();
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const [activeTab, setActiveTab] = React.useState("chart");
  const [expandedVizItem, setExpandedVizItem] = React.useState<
    string | number | null
  >(null);
  const [selectedVizItem, setSelectedVizItem] = React.useState<
    string | number | null
  >(null);
  const isProjects = get(params, "tab", "") === "projects";
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizCompData, setVizCompData] = React.useState<BarItemProps[]>([]);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [sectorDrillDown, setSectorDrillDown] = React.useState("");
  const [prevTab, setPrevTab] = React.useState(get(params, "tab", ""));
  const [selectedFilters] = useRecoilState(selectedFilterAtom);
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
    get(state.budgetLinesBarChart, "data.vizData", [])
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
    projectsAction({
      addOnData: true,
      values: {
        filters,
        page: projectListPage,
      },
    });
    setProjectListPage(projectListPage + 1);
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
      (d: BarItemProps) => d.data.indexValue.toString() === item
    );
    setVizScale(1);
    setVizTranslation({
      x: get(fVizCompData, "x", 80) * -1 + 80,
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

  React.useEffect(() => {
    setVizLevel(0);
    setVizScale(1);
    setSelectedVizItem(null);
    setExpandedVizItem(null);
    onTabChange(prevTab);
    setActiveTab("chart");

    const filters = getAPIFormattedFilters(selectedFilters);
    switch (get(params, "tab", "")) {
      case "oda":
        if (
          odaBarChartData.length === 0 ||
          !isEqual(ODAlatestFilters, selectedFilters)
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
          !isEqual(ThematicAreasLatestFilters, selectedFilters)
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
          !isEqual(SectorsSunburstLatestFilters, selectedFilters)
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
          !isEqual(LocationsTreemapLatestFilters, selectedFilters)
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
          !isEqual(OrganisationsLatestFilters, selectedFilters)
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
          !isEqual(BudgetLinesLatestFilters, selectedFilters)
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
          !isEqual(ProjectsLatestFilters, selectedFilters)
        ) {
          projectsAction({
            values: {
              filters,
            },
          });
        }
        break;
      default:
        break;
    }
  }, [get(params, "tab", "")]);

  useUnmount(() => {
    onTabChange(get(params, "tab", ""));
  });

  React.useEffect(() => {
    if (selectedVizItem === null && expandedVizItem === null) {
      setVizLevel(0);
      setVizScale(1);
      setVizTranslation({ x: 0, y: 0 });
    }
    if (expandedVizItem && get(params, "tab", "") === "oda" && vizLevel > 0) {
      odaBudgetLinesChartAction({
        values: {
          filters: {
            period: [
              {
                startDate: `${expandedVizItem}-01-01T00:00:00Z`,
                endDate: `${expandedVizItem}-12-31T23:59:59Z`,
              },
            ],
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

  React.useEffect(() => {
    if (activeTab === "chart") {
      setSectorDrillDown("");
    }
  }, [activeTab]);

  return (
    <Grid
      container
      css={`
        margin-top: -16px;
        height: calc(100vh - 135px);
      `}
    >
      <Grid item sm={12}>
        <VizTabs />
      </Grid>
      <Grid
        container
        css={`
          padding: 0 50px;
          height: calc(100% - 76px);
        `}
      >
        <Grid
          item
          sm={12}
          css={`
            background: #fff;
          `}
          md={isProjects ? 12 : 9}
          lg={isProjects ? 12 : 8}
          xl={isProjects ? 12 : 8}
        >
          <div
            css={`
              left: 0;
              top: 0px;
              width: 100vw;
              position: absolute;
              background: #fff;
              height: 100vh;
              z-index: -3;
            `}
          />
          <Switch>
            <Route path="/viz/oda">
              {vizDataLoading.oda ? (
                <VizLoader />
              ) : (
                <ODAvizModule
                  vizScale={vizScale}
                  vizLevel={vizLevel}
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  data={odaBarChartData}
                  vizCompData={vizCompData}
                  setVizCompData={setVizCompData}
                  onSelectChange={onSelectChange}
                  vizTranslation={vizTranslation}
                  selectedVizItemId={expandedVizItem}
                  setSelectedVizItem={setExpandedVizItem}
                  onArrowSelectChange={onZoomInLevelSelectorChange}
                  odaBudgetLinesChartData={odaBudgetLinesChartData}
                  odaBudgetLinesChartLoading={odaBudgetLinesChartLoading}
                />
              )}
            </Route>
            <Route path="/viz/thematic-areas">
              {vizDataLoading.thematic ? (
                <VizLoader />
              ) : activeTab === "chart" ? (
                <ThematicAreas
                  data={thematicAreasChartData}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                />
              ) : (
                <div
                  css={`
                    padding: 24px 24px 24px 0;
                  `}
                >
                  <DataTable
                    data={thematicAreasChartData}
                    options={thematicAreasDataTableOptions}
                    columns={thematicAreasDataTableColumns}
                    title={`${thematicAreasChartData.length} thematic areas`}
                  />
                </div>
              )}
            </Route>
            <Route path="/viz/sectors">
              {vizDataLoading.sectors ? (
                <VizLoader />
              ) : (
                <SectorsVizModule
                  vizLevel={vizLevel}
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  scrollableHeight={height}
                  data={sectorsSunburstData}
                  sectorDrillDown={sectorDrillDown}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                  activitiesCount={sectorsSunburstDataCount}
                  onSectorSelectChange={onSectorSelectChange}
                  clearSectorDrillDown={() => setSectorDrillDown("")}
                />
              )}
            </Route>
            <Route path="/viz/countries-regions">
              {vizDataLoading.locations ? (
                <VizLoader />
              ) : (
                <CountriesRegionsModule
                  label=""
                  activeTab={activeTab}
                  scrollableHeight={height}
                  data={locationsTreemapData}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                />
              )}
            </Route>
            <Route path="/viz/organisations">
              {vizDataLoading.organisations ? (
                <VizLoader />
              ) : (
                <OrganisationsModule
                  label=""
                  activeTab={activeTab}
                  scrollableHeight={height}
                  data={organisationsTreemapData}
                  selectedVizItemId={selectedVizItem}
                  setSelectedVizItem={setSelectedVizItem}
                />
              )}
            </Route>
            <Route path="/viz/budget-lines">
              {vizDataLoading.budgetLines ? (
                <VizLoader />
              ) : (
                <BudgetLinesModule
                  activeTab={activeTab}
                  onZoomOut={onZoomOut}
                  scrollableHeight={height}
                  vizCompData={vizCompData}
                  data={budgetLinesBarChartData}
                  setVizCompData={setVizCompData}
                  onSelectChange={onSelectChange}
                  selectedVizItemId={expandedVizItem}
                  setSelectedVizItem={setExpandedVizItem}
                />
              )}
            </Route>
            <Route path="/viz/projects">
              <ProjectsListModule
                projects={projectsData}
                count={projectsCountData}
                loadMore={loadMoreProjects}
                loading={vizDataLoading.projects}
              />
            </Route>
          </Switch>
        </Grid>
        {!isProjects && (
          <Grid item sm={12} md={3} lg={4} xl={4}>
            <div
              css={`
                right: 0;
                top: 0px;
                width: 50vw;
                position: absolute;
                background: ${PrimaryColor[1]};
                height: 100vh;
                z-index: -2;
              `}
            />
            <div
              ref={ref}
              css={`
                width: 100%;
                height: 100%;
                display: flex;
                background: ${PrimaryColor[1]};

                ${vizLevel > 0
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
                  selectedVizItem
                )}
                activeTab={activeTab}
                scrollableHeight={height}
                setActiveTab={setActiveTab}
                vizType={get(params, "tab", "")}
                setSelected={setSelectedVizItem}
                setExpanded={setExpandedVizItem}
                selectedVizItem={selectedVizItem}
                expandedVizItem={expandedVizItem}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
