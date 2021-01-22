import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { PrimaryColor } from "app/theme";
import { VizTabs } from "app/components/VizTabs";
import { BarChart } from "app/components/Charts/bar";
import { Treemap } from "app/components/Charts/treemap";
import { barMockData } from "app/components/Charts/bar/data";
import { SunburstChart } from "app/components/Charts/sunburst";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { TreemapMockData } from "app/components/Charts/treemap/data";
import { SunburstChartMockData } from "app/components/Charts/sunburst/data";
import { thematicareasMockData } from "app/components/Charts/thematicareas/data";

export default function VizModule() {
  const { params } = useRouteMatch();
  const isProjects = get(params, "tab", "") === "projects";
  return (
    <Grid container css="height: calc(100% - 76px);">
      <Grid item sm={12}>
        <VizTabs />
      </Grid>
      <Grid container css="height: calc(100% - 76px);padding: 0 100px;">
        <Grid
          item
          sm={12}
          css="padding: 50px 0;"
          md={isProjects ? 12 : 9}
          lg={isProjects ? 12 : 8}
          xl={isProjects ? 12 : 8}
        >
          <Switch>
            <Route path="/viz/oda">
              <BarChart data={barMockData} />
            </Route>
            <Route path="/viz/thematic-areas">
              <ThematicAreas data={thematicareasMockData} />
            </Route>
            <Route path="/viz/sectors">
              <SunburstChart
                data={SunburstChartMockData}
                activitiesCount={8256876601.879997}
              />
            </Route>
            <Route path="/viz/countries-regions">
              <Treemap label="" data={TreemapMockData} />
            </Route>
            <Route path="/viz/organisations">
              <Treemap label="" data={TreemapMockData} />
            </Route>
            <Route path="/viz/budget-lines">budget lines viz</Route>
            <Route path="/viz/projects">projects table/list</Route>
          </Switch>
        </Grid>
        {!isProjects && (
          <Grid item sm={12} md={3} lg={4} xl={4}>
            <div
              css={`
                width: 100%;
                height: 100%;
                display: flex;
                background: ${PrimaryColor[1]};
              `}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
