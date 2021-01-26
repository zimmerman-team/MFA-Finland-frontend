import React from "react";
import get from "lodash/get";
import { useMeasure } from "react-use";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { PrimaryColor } from "app/theme";
import { VizTabs } from "app/components/VizTabs";
import { BarChart } from "app/components/Charts/bar";
import { Treemap } from "app/components/Charts/treemap";
import { VizSidePanel } from "app/components/VizSidePanel";
import { barMockData } from "app/components/Charts/bar/data";
import { SunburstChart } from "app/components/Charts/sunburst";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { getSidebarLegendItems } from "app/modules/viz-module/utils";
import {
  TreemapMockData,
  CountriesTreemapMockData,
} from "app/components/Charts/treemap/data";
import { SunburstChartMockData } from "app/components/Charts/sunburst/data";
import { thematicareasMockData } from "app/components/Charts/thematicareas/data";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";

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

  // console.log(expandedVizItem, selectedVizItem);

  React.useEffect(() => {
    setSelectedVizItem(null);
    setExpandedVizItem(null);
  }, [get(params, "tab", "")]);

  React.useEffect(() => {
    setLegends(
      getSidebarLegendItems(
        get(params, "tab", ""),
        {
          oda: barMockData,
          "thematic-areas": thematicareasMockData,
          sectors: SunburstChartMockData,
          "countries-regions": CountriesTreemapMockData,
          organisations: TreemapMockData,
        },
        selectedVizItem
      )
    );
  }, [selectedVizItem, get(params, "tab", "")]);

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
            padding: 50px 0;
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
              <BarChart
                data={barMockData}
                selectedVizItemId={expandedVizItem}
                setSelectedVizItem={setExpandedVizItem}
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
              <SunburstChart
                data={SunburstChartMockData}
                activitiesCount={8256876601.879997}
                selectedVizItemId={selectedVizItem}
                setSelectedVizItem={setSelectedVizItem}
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
