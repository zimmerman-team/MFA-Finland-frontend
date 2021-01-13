// base
import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

// global search actions-reducers
import searchDonors from "app/state/api/actions-reducers/global-search/donors";
import searchCountries from "app/state/api/actions-reducers/global-search/countries";
import searchActivities from "app/state/api/actions-reducers/global-search/activities";
import searchPublishers from "app/state/api/actions-reducers/global-search/publishers";
import searchOrganisations from "app/state/api/actions-reducers/global-search/organisations";

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

// filtering
import {
  countries as fcountries,
  regions,
  sectors as fsectors,
  donors as fdonors,
  organisations as forganisations,
  publishers as fpublishers,
  activitystatus,
} from "app/state/api/actions-reducers/filterOptions";

// sync variables
import syncSearch from "app/state/api/actions-reducers/sync/search";
import filtersUpdated from "app/state/api/actions-reducers/sync/filtersUpdated";

// auth
// import user from "app/state/api/actions-reducers/auth/user";
// import users from "app/state/api/actions-reducers/auth/users";
// import updateUser from "app/state/api/actions-reducers/auth/updateUser";
// import deleteUser from "app/state/api/actions-reducers/auth/deleteUser";

const storeContent: StoreModel = {
  // filtering
  filterOptions: {
    countries: persist(fcountries, {
      storage: "localStorage",
    }),
    regions: persist(regions, {
      storage: "localStorage",
    }),
    sectors: persist(fsectors, {
      storage: "localStorage",
    }),
    donors: persist(fdonors, {
      storage: "localStorage",
    }),
    organisations: persist(forganisations, {
      storage: "localStorage",
    }),
    publishers: persist(fpublishers, {
      storage: "localStorage",
    }),
    activitystatus: persist(activitystatus, {
      storage: "localStorage",
    }),
  },
  // global search
  searchDonors,
  searchCountries,
  searchActivities,
  searchPublishers,
  searchOrganisations,
  // viz
  donors: persist(donors),
  sectors: persist(sectors),
  treemap: persist(treemap),
  sunburst: persist(sunburst),
  donorsTreemap: persist(donorsTreemap),
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
  detailPublishersTable: persist(detailPublishersTable),
  detailDonorsTable: persist(detailDonorsTable),
  // sync variables
  syncSearch: persist(syncSearch),
  filtersUpdated: persist(filtersUpdated),
  // auth
  // users: persist(users),
  // user: persist(user),
  // updateUser: persist(updateUser),
  // deleteUser: persist(deleteUser),
};

export const store = createStore(storeContent);
