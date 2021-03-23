// base
import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

// global search actions-reducers
import searchDonors from "app/state/api/actions-reducers/global-search/donors";
import searchSectors from "app/state/api/actions-reducers/global-search/sectors";
import searchCountries from "app/state/api/actions-reducers/global-search/countries";
import searchActivities from "app/state/api/actions-reducers/global-search/activities";
import searchOrganisations from "app/state/api/actions-reducers/global-search/organisations";
import searchThematicareas from "app/state/api/actions-reducers/global-search/thematicareas";

// viz actions-reducers
import treemap from "app/state/api/actions-reducers/treemap";
import sunburst from "app/state/api/actions-reducers/sunburst";
import linechart from "app/state/api/actions-reducers/linechart";
import donorsTreemap from "app/state/api/actions-reducers/donorsTreemap";
import geomapPublishers from "app/state/api/actions-reducers/geomapPublishers";
import geomapDonors from "app/state/api/actions-reducers/geomapDonors";
import geomapActivities from "app/state/api/actions-reducers/geomapActivities";
import activitiesTable from "app/state/api/actions-reducers/activitiesTable";
import donorsTable from "app/state/api/actions-reducers/donorsTable";
import publishersTable from "app/state/api/actions-reducers/publishersTable";
import sdgViz from "app/state/api/actions-reducers/viz/sdgViz";
import geoMap from "app/state/api/actions-reducers/viz/geoMap";
import odaBarChart from "app/state/api/actions-reducers/viz/odaBarChart";
import thematicAreasChart from "app/state/api/actions-reducers/viz/thematicAreasChart";
import sectorsSunburst from "app/state/api/actions-reducers/viz/sectorsSunburst";
import organisationsTreemap from "app/state/api/actions-reducers/viz/organisationsTreemap";
import locationsTreemap from "app/state/api/actions-reducers/viz/locationsTreemap";
import budgetLinesBarChart from "app/state/api/actions-reducers/viz/budgetLinesBarChart";
import odaBudgetLinesChart from "app/state/api/actions-reducers/viz/odaBudgetLinesChart";
import sectorProjects from "app/state/api/actions-reducers/viz/sectorProjects";

// table actions-reducers
import donors from "app/state/api/actions-reducers/donors";
import sectors from "app/state/api/actions-reducers/sectors";
import countries from "app/state/api/actions-reducers/countries";
import activities from "app/state/api/actions-reducers/activities";
import publishers from "app/state/api/actions-reducers/publishers";
import organisations from "app/state/api/actions-reducers/organisations";

// detail pages
import countryDetail from "app/state/api/actions-reducers/detail-pages/country";
import donorDetail from "app/state/api/actions-reducers/detail-pages/donor";
import publisherDetail from "app/state/api/actions-reducers/detail-pages/publisher";
import organisationDetail from "app/state/api/actions-reducers/detail-pages/organisation";
import detailActivities from "app/state/api/actions-reducers/detail-pages/detailActivities";
import organisationsTable from "app/state/api/actions-reducers/detail-pages/organisationsTable";
import detailPublishersTable from "app/state/api/actions-reducers/detail-pages/detailPublishersTable";
import detailDonorsTable from "app/state/api/actions-reducers/detail-pages/detailDonorsTable";
import sectorsTable from "app/state/api/actions-reducers/detail-pages/sectorsTable";
import activityDetail from "app/state/api/actions-reducers/detail-pages/activityDetail";
import activitySDG from "app/state/api/actions-reducers/detail-pages/activitySDG";
import detailPageName from "app/state/api/actions-reducers/detail-pages/detailPageName";

// filtering
import {
  locations,
  sectors as fsectors,
  thematicareas as fthematicareas,
  organisations as forganisations,
  sdgs as fsdgs,
  activitystatus,
  policymarkers,
  aidtypes,
  budgetlines,
} from "app/state/api/actions-reducers/filterOptions";

// sync variables
import syncSearch from "app/state/api/actions-reducers/sync/search";
import { projectListPage } from "app/state/api/actions-reducers/sync/generic";
import filtersUpdated from "app/state/api/actions-reducers/sync/filtersUpdated";

// cms
import general from "app/state/api/actions-reducers/cms/general";
import feedback from "app/state/api/actions-reducers/feedback";
import viz from "../api/actions-reducers/cms/viz";
import filters from "../api/actions-reducers/cms/filters";
import menu from "../api/actions-reducers/cms/menu";

const storeContent: StoreModel = {
  // filtering
  filterOptions: {
    locations: persist(locations, {
      storage: "localStorage",
    }),
    sectors: persist(fsectors, {
      storage: "localStorage",
    }),
    thematicareas: persist(fthematicareas, {
      storage: "localStorage",
    }),
    organisations: persist(forganisations, {
      storage: "localStorage",
    }),
    sdgs: persist(fsdgs, {
      storage: "localStorage",
    }),
    activitystatus: persist(activitystatus, {
      storage: "localStorage",
    }),
    policymarkers: persist(policymarkers, {
      storage: "localStorage",
    }),
    aidtypes: persist(aidtypes, {
      storage: "localStorage",
    }),
    budgetlines: persist(budgetlines, {
      storage: "localStorage",
    }),
  },
  // cms
  cms: {
    general: persist(general),
    viz: persist(viz),
    filters: persist(filters),
    menu: persist(menu),
  },
  // global search
  searchDonors,
  searchSectors,
  searchCountries,
  searchActivities,
  searchOrganisations,
  searchThematicareas,
  // viz
  donors: persist(donors),
  sectors: persist(sectors),
  treemap: persist(treemap),
  sunburst: persist(sunburst),
  odaBarChart: persist(odaBarChart),
  donorsTreemap: persist(donorsTreemap),
  sectorsSunburst: persist(sectorsSunburst),
  locationsTreemap: persist(locationsTreemap),
  thematicAreasChart: persist(thematicAreasChart),
  budgetLinesBarChart: persist(budgetLinesBarChart),
  organisationsTreemap: persist(organisationsTreemap),
  sdgViz: persist(sdgViz),
  geoMap: persist(geoMap),
  sectorProjects: persist(sectorProjects),
  odaBudgetLinesChart: persist(odaBudgetLinesChart),
  // table
  countries: persist(countries),
  linechart: persist(linechart),
  activities: persist(activities),
  publishers: persist(publishers),
  organisations: persist(organisations),
  activitiesTable: persist(activitiesTable),
  geomapActivities: persist(geomapActivities),
  geomapDonors: persist(geomapDonors),
  donorsTable: persist(donorsTable),
  geomapPublishers: persist(geomapPublishers),
  publishersTable: persist(publishersTable),
  // detail pages
  countryDetail: persist(countryDetail),
  donorDetail: persist(donorDetail),
  publisherDetail: persist(publisherDetail),
  organisationDetail: persist(organisationDetail),
  detailActivities: persist(detailActivities),
  organisationsTable: persist(organisationsTable),
  sectorsTable: persist(sectorsTable),
  activityDetail: persist(activityDetail),
  activitySDG: persist(activitySDG),
  detailPublishersTable: persist(detailPublishersTable),
  detailDonorsTable: persist(detailDonorsTable),
  detailPageName: persist(detailPageName),
  feedback: persist(feedback),
  // sync variables
  syncSearch: persist(syncSearch),
  filtersUpdated: persist(filtersUpdated),
  projectListPage: persist(projectListPage),
};

export const store = createStore(storeContent);
