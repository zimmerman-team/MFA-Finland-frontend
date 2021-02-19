import { Action, Thunk } from "easy-peasy";
// import { UserMetaData } from "app/interfaces/User";
import { SyncSearchModel } from "app/state/api/actions-reducers/sync/search";
import { FiltersUpdatedModel } from "app/state/api/actions-reducers/sync/filtersUpdated";
import { ProjectListPage } from "../actions-reducers/sync/generic";

export interface RequestValues<T> {
  values?: T;
  addOnData?: boolean;
}

export interface ResponseData<T> {
  data: any[];
  count: number;
  addOnData?: boolean;
  vizData: any[] | undefined;
}

export interface Errors {
  status: number | null;
  statusText: string | null;
  result: object | null;
}

export interface ApiModel<QueryModel, ResponseModel> {
  loading: boolean;
  success: boolean;
  data: ResponseData<ResponseModel> | null | ResponseData<ResponseModel>[];
  setData: Action<ApiModel<QueryModel, ResponseModel>, any>;
  errorData: Errors | null;
  onError: Action<ApiModel<QueryModel, ResponseModel>, Errors>;
  setSuccess: Action<ApiModel<QueryModel, ResponseModel>>;
  onSuccess: Action<
    ApiModel<QueryModel, ResponseModel>,
    ResponseData<ResponseModel> | ResponseData<ResponseModel>[]
  >;
  onRequest: Action<ApiModel<QueryModel, ResponseModel>>;
  fetch: Thunk<ApiModel<QueryModel, ResponseModel>, RequestValues<QueryModel>>;
  /*authPostFetch: Thunk<
    ApiModel<QueryModel, ResponseModel>,
    RequestValues<QueryModel>
  >;
  authGetFetch: Thunk<
    ApiModel<QueryModel, ResponseModel>,
    RequestValues<QueryModel>
  >;*/
  clear: Action<ApiModel<QueryModel, ResponseModel>>;
}

// todo: add all available filters
interface ApiCallParamsFilters {
  q?: string;
  sector_code?: string[];
  reporting_org_ref?: string[];
  activity_status_code?: string[];
  participating_org_ref?: string[];
  recipient_region_code?: string[];
  recipient_country_code?: string[];
  transaction_provider_org_ref?: string[];
  iati_identifier?: string[];
  period?: {
    startDate: string;
    endDate: string;
  }[];
}

export interface ApiCallParams {
  q?: string;
  sort?: string;
  page?: number;
  rows?: number;
  activityId?: string;
  filter_type?: string;
  filters?: ApiCallParamsFilters | string;
  search?: string;
  extra_param?: string;

  token?: string;
  user_id?: string;
  name?: string;
  picture?: string;
  // user_metadata?: UserMetaData;
}

export interface ApiResponseModel {
  data: any[];
  count: number;
  vizData: any[];
}

export interface ApiCallModel
  extends ApiModel<
    ApiCallParams | ApiCallParams[] | string,
    ApiResponseModel
  > {}

export interface StoreModel {
  // global search
  searchDonors: ApiCallModel;
  searchCountries: ApiCallModel;
  searchActivities: ApiCallModel;
  searchPublishers: ApiCallModel;
  searchOrganisations: ApiCallModel;
  // viz
  donors: ApiCallModel;
  sectors: ApiCallModel;
  treemap: ApiCallModel;
  sunburst: ApiCallModel;
  odaBarChart: ApiCallModel;
  sectorsSunburst: ApiCallModel;
  locationsTreemap: ApiCallModel;
  thematicAreasChart: ApiCallModel;
  budgetLinesBarChart: ApiCallModel;
  organisationsTreemap: ApiCallModel;
  sdgViz: ApiCallModel;
  geoMap: ApiCallModel;
  sectorProjects: ApiCallModel;
  odaBudgetLinesChart: ApiCallModel;
  // table
  countries: ApiCallModel;
  linechart: ApiCallModel;
  activities: ApiCallModel;
  publishers: ApiCallModel;
  organisations: ApiCallModel;
  // geomap
  activitiesTable: ApiCallModel;
  geomapActivities: ApiCallModel;
  geomapDonors: ApiCallModel;
  donorsTable: ApiCallModel;
  geomapPublishers: ApiCallModel;
  publishersTable: ApiCallModel;
  // detail pages
  countryDetail: ApiCallModel;
  donorDetail: ApiCallModel;
  publisherDetail: ApiCallModel;
  organisationDetail: ApiCallModel;
  detailActivities: ApiCallModel;
  organisationsTable: ApiCallModel;
  detailPublishersTable: ApiCallModel;
  detailDonorsTable: ApiCallModel;
  sectorsTable: ApiCallModel;
  activityDetail: ApiCallModel;
  activitySDG: ApiCallModel;
  donorsTreemap: ApiCallModel;
  detailPageName: ApiCallModel;
  // auth
  // users: ApiCallModel;
  // user: ApiCallModel;
  // updateUser: ApiCallModel;
  // deleteUser: ApiCallModel;
  // filtering
  filterOptions: {
    countries: ApiCallModel;
    regions: ApiCallModel;
    sectors: ApiCallModel;
    thematicareas: ApiCallModel;
    organisations: ApiCallModel;
    sdgs: ApiCallModel;
    activitystatus: ApiCallModel;
  };
  // sync variables
  syncSearch: SyncSearchModel;
  projectListPage: ProjectListPage;
  filtersUpdated: FiltersUpdatedModel;
}
