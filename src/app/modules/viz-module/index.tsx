import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useMeasure } from "react-use";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { PrimaryColor } from "app/theme";
import { BarItemProps } from "@nivo/bar";
import { VizTabs } from "app/components/VizTabs";
import { Treemap } from "app/components/Charts/treemap";
import { VizSidePanel } from "app/components/VizSidePanel";
import { barMockData, simplebarMockData } from "app/components/Charts/bar/data";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { getSidebarLegendItems } from "app/modules/viz-module/utils";
import {
  TreemapMockData,
  CountriesTreemapMockData,
} from "app/components/Charts/treemap/data";
import { SunburstChartMockData } from "app/components/Charts/sunburst/data";
import { thematicareasMockData } from "app/components/Charts/thematicareas/data";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import { ODAvizModule } from "app/components/Charts/modules/oda";
import { SectorsVizModule } from "app/components/Charts/modules/sectors";

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
  const [legends, setLegends] = React.useState<VizSidePanelItemProps[]>([]);
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizCompData, setVizCompData] = React.useState<BarItemProps[]>([]);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [sectorDrillDown, setSectorDrillDown] = React.useState("");

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

  React.useEffect(() => {
    setVizLevel(0);
    setVizScale(1);
    setSelectedVizItem(null);
    setExpandedVizItem(null);
  }, [get(params, "tab", "")]);

  React.useEffect(() => {
    if (vizLevel === 0) {
      setLegends(
        getSidebarLegendItems(
          get(params, "tab", ""),
          {
            oda: barMockData,
            "oda-drilldown": simplebarMockData,
            "thematic-areas": thematicareasMockData,
            sectors: SunburstChartMockData,
            "countries-regions": CountriesTreemapMockData,
            organisations: TreemapMockData,
          },
          selectedVizItem
        )
      );
    }
  }, [vizLevel, selectedVizItem, get(params, "tab", "")]);

  React.useEffect(() => {
    if (expandedVizItem && get(params, "tab", "") === "oda" && vizLevel > 0) {
      setLegends(
        getSidebarLegendItems(
          "oda-drilldown",
          {
            oda: barMockData,
            "oda-drilldown": simplebarMockData,
            "thematic-areas": thematicareasMockData,
            sectors: SunburstChartMockData,
            "countries-regions": CountriesTreemapMockData,
            organisations: TreemapMockData,
          },
          selectedVizItem
        )
      );
    }
  }, [vizLevel, expandedVizItem]);

  React.useEffect(() => {
    if (selectedVizItem === null && expandedVizItem === null) {
      setVizLevel(0);
      setVizScale(1);
      setVizTranslation({ x: 0, y: 0 });
    }
  }, [selectedVizItem, expandedVizItem]);

  return (
    <Grid
      container
      css={`
        margin-top: -16px;
        height: calc(100% - 135px);
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
              <ODAvizModule
                data={barMockData}
                vizScale={vizScale}
                vizLevel={vizLevel}
                onZoomOut={onZoomOut}
                vizCompData={vizCompData}
                setVizCompData={setVizCompData}
                onSelectChange={onSelectChange}
                vizTranslation={vizTranslation}
                selectedVizItemId={expandedVizItem}
                setSelectedVizItem={setExpandedVizItem}
                onArrowSelectChange={onZoomInLevelSelectorChange}
              />
            </Route>
            <Route path="/viz/thematic-areas">
              <ThematicAreas
                data={thematicareasMockData}
                selectedVizItemId={selectedVizItem}
                setSelectedVizItem={setSelectedVizItem}
              />
            </Route>
            <Route path="/viz/sectors">
              <SectorsVizModule
                vizScale={vizScale}
                vizLevel={vizLevel}
                onZoomOut={onZoomOut}
                data={SunburstChartMockData}
                vizTranslation={vizTranslation}
                sectorDrillDown={sectorDrillDown}
                activitiesCount={8256876601.879997}
                selectedVizItemId={selectedVizItem}
                setSelectedVizItem={setSelectedVizItem}
                onSectorSelectChange={onSectorSelectChange}
                // onArrowSelectChange={onZoomInLevelSelectorChange}
              />
            </Route>
            <Route path="/viz/countries-regions">
              <Treemap
                label=""
                data={CountriesTreemapMockData}
                selectedVizItemId={selectedVizItem}
                setSelectedVizItem={setSelectedVizItem}
              />
            </Route>
            <Route path="/viz/organisations">
              <Treemap
                label=""
                data={TreemapMockData}
                selectedVizItemId={selectedVizItem}
                setSelectedVizItem={setSelectedVizItem}
              />
            </Route>
            <Route path="/viz/budget-lines">budget lines viz</Route>
            <Route path="/viz/projects">projects table/list</Route>
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
                items={legends}
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
