//cc:application base#;application routes

import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";

import { SunburstChart } from "app/components/Charts/sunburst";
import { SunburstChartMockData } from "app/components/Charts/sunburst/data";
import { Treemap } from "app/components/Charts/treemap";
import { TreemapMockData } from "app/components/Charts/treemap/data";
import { BarChart } from "app/components/Charts/bar";
import { SimpleBarChart } from "app/components/Charts/bar/simple";
import { barMockData, simplebarMockData } from "app/components/Charts/bar/data";

const AboutModule = lazy(() => import("app/modules/about-module"));
const LandingModule = lazy(() => import("app/modules/landing-module"));

export function ModuleRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/">
          <LandingModule />
        </Route>

        <Route exact path="/about">
          <AboutModule />
        </Route>

        <Route exact path="/viz">
          {/* <Treemap label="" data={TreemapMockData} /> */}
          {/* <SunburstChart
            data={SunburstChartMockData}
            activitiesCount={8256876601.879997}
          /> */}
          <BarChart data={barMockData} />
          {/* <SimpleBarChart data={simplebarMockData} /> */}
        </Route>

        <Route exact path="/notFound">
          <NoMatchPage />
        </Route>
      </Switch>
    </Suspense>
  );
}
