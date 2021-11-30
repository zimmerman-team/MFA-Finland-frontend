// cc:application base#;application routes
import React, { Suspense } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";

import { Path } from "app/const/Path";
import { useRecoilState } from "recoil";
import VizModule from "app/modules/viz-module";
import { Footer } from "app/components/Footer";
import { useCMSData } from "app/hooks/useCMSData";
import { languageAtom } from "app/state/recoil/atoms";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { useScrollToTop } from "app/hooks/useScrollToTop";
import { useInitialLoad } from "app/hooks/useInitialLoad";
import { useCMSCollections } from "app/hooks/useCMSCollections";

import { LandingModule } from "app/modules/landing-module";
import { useGenericPageData } from "app/hooks/useGenericPageData";
import { ProjectDetailModule } from "app/modules/project-detail-module";
import { GenericPageLayout } from "app/modules/generic-page-module/layout";
import { SectorDetailModule } from "app/modules/detail-modules/sector-detail-module";
import { RegionDetailModule } from "app/modules/detail-modules/region-detail-module";
import { CountryDetailModule } from "app/modules/detail-modules/country-detail-module";
import { ThematicDetailModule } from "app/modules/detail-modules/thematic-detail-module";
import { OrganisationDetailModule } from "app/modules/detail-modules/organisation-detail-module";
import { OrganisationTypeDetailModule } from "app/modules/detail-modules/organisation-type-detail-module";

function NoLangParamRedirect(routeProps: RouteProps) {
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <Redirect
      to={`/${currentLanguage === "se" ? "sv" : currentLanguage}${
        routeProps.location?.pathname
      }${routeProps.location?.search}`}
    />
  );
}

export function ModuleRoutes() {
  useCMSData({
    loadData: true,
  });
  useCMSCollections({
    loadData: true,
  });
  useUrlFilters();
  useInitialLoad();
  useScrollToTop();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route
          exact
          path={Path.withoutLangParam.home}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.home}>
          <LandingModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.region}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.region}>
          <RegionDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.country}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.country}>
          <CountryDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.sector}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.sector}>
          <SectorDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.organisation}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.organisation}>
          <OrganisationDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.orgType}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.orgType}>
          <OrganisationTypeDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.thematicArea}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.thematicArea}>
          <ThematicDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.detail.project}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.detail.project}>
          <ProjectDetailModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.general.about}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.general.about}>
          <GenericPageLayout {...useGenericPageData("about")} />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.general.statements}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.general.statements}>
          <GenericPageLayout {...useGenericPageData("statements")} />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.general.result}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.general.result}>
          <GenericPageLayout {...useGenericPageData("results")} />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.general.feedback}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.general.feedback}>
          <GenericPageLayout {...useGenericPageData("feedback")} />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.vizTab}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.vizTab}>
          <VizModule />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.viz}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.viz}>
          <Redirect to="/viz/oda" />
        </Route>

        <Route
          exact
          path={Path.withoutLangParam.general.notFound}
          render={(routeProps: RouteProps) => (
            <NoLangParamRedirect {...routeProps} />
          )}
        />
        <Route exact path={Path.general.notFound}>
          <NoMatchPage />
        </Route>
      </Switch>
      <Footer />
    </Suspense>
  );
}
