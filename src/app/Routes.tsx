//cc:application base#;application routes

import React, { Suspense } from "react";
import { useStoreRehydrated } from "easy-peasy";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";

import VizModule from "app/modules/viz-module";
import { useCMSData } from "app/hooks/useCMSData";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { useInitialLoad } from "app/hooks/useInitialLoad";
// import { useScrollToTop } from "app/hooks/useScrollToTop";

import { LandingModule } from "app/modules/landing-module";
import { RegionDetailModule } from "app/modules/detail-modules/region-detail-module";
import { CountryDetailModule } from "app/modules/detail-modules/country-detail-module";
import { ThematicDetailModule } from "app/modules/detail-modules/thematic-detail-module";
import { OrganisationDetailModule } from "app/modules/detail-modules/organisation-detail-module";
import { SectorDetailModule } from "app/modules/detail-modules/sector-detail-module";
import { AboutModule } from "app/modules/about-module";
import { PrivacyModule } from "app/modules/privacy-module";
import { StatementModule } from "app/modules/statement-module";
import { FeedbackModule } from "app/modules/feedback-module";
import { ProjectDetailModule } from "app/modules/project-detail-module";
import { OrganisationTypeDetailModule } from "app/modules/detail-modules/organisation-type-detail-module";
import { Path } from "app/const/Path";
import { ResultModule } from "app/modules/result-module";

export function ModuleRoutes() {
  useCMSData({
    loadData: true,
  });
  useUrlFilters();
  useInitialLoad();
  // useScrollToTop();

  const isRehydrated = useStoreRehydrated();
  if (!isRehydrated) {
    return <PageLoader />;
  }

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
          <SectorDetailModule />
        </Route>

        <Route exact path="/organisations/:organisation">
          <OrganisationDetailModule />
        </Route>

        <Route exact path="/organisation-types/:orgType">
          <OrganisationTypeDetailModule />
        </Route>

        <Route exact path="/thematic-area/:theme">
          <ThematicDetailModule />
        </Route>

        <Route exact path="/project/:param">
          <ProjectDetailModule />
        </Route>

        <Route exact path={Path.general.about}>
          <AboutModule />
        </Route>

        <Route exact path={Path.general.privacy}>
          <PrivacyModule />
        </Route>

        <Route exact path={Path.general.statements}>
          <StatementModule />
        </Route>
        <Route exact path={Path.general.result}>
          <ResultModule />
        </Route>

        <Route exact path={Path.general.feedback}>
          <FeedbackModule />
        </Route>

        <Route exact path="/viz/:tab">
          <VizModule />
        </Route>

        <Route exact path="/viz">
          <Redirect to="/viz/oda" />
        </Route>

        <Route exact path={Path.general.notFound}>
          <NoMatchPage />
        </Route>
      </Switch>
    </Suspense>
  );
}
