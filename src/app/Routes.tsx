//cc:application base#;application routes

import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";

import VizModule from "app/modules/viz-module";

import { LandingModule } from "app/modules/landing-module";
import { RegionDetailModule } from "app/modules/detail-modules/region-detail-module";
import { CountryDetailModule } from "app/modules/detail-modules/country-detail-module";
import { ThematicDetailModule } from "app/modules/detail-modules/thematic-detail-module";
import { OrganisationDetailModule } from "app/modules/detail-modules/organisation-detail-module";
import { AboutModule } from "app/modules/about-module";
import { PrivacyModule } from "app/modules/privacy-module";
import { StatementModule } from "app/modules/statement-module";
import { FeedbackModule } from "app/modules/feedback-module";

export function ModuleRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/">
          <LandingModule />
        </Route>

        <Route exact path="/regions/:region">
          <RegionDetailModule />
        </Route>

        <Route exact path="/countries/:country">
          <CountryDetailModule />
        </Route>

        <Route exact path="/sectors/:sector">
          <CountryDetailModule />
        </Route>

        <Route exact path="/organisations/:organisation">
          <OrganisationDetailModule />
        </Route>

        <Route exact path="/thematic/:theme">
          <ThematicDetailModule />
        </Route>

        <Route exact path="/about">
          <AboutModule />
        </Route>

        <Route exact path="/privacy">
          <PrivacyModule />
        </Route>

        <Route exact path="/statement">
          <StatementModule />
        </Route>

        <Route exact path="/feedback">
          <FeedbackModule />
        </Route>

        <Route exact path="/viz/:tab">
          <VizModule />
        </Route>

        <Route exact path="/notFound">
          <NoMatchPage />
        </Route>
      </Switch>
    </Suspense>
  );
}
