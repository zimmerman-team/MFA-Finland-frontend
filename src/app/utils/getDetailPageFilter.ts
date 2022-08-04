/* eslint-disable @typescript-eslint/camelcase */
import { getCountryCode } from "app/utils/getCountryCode";
import {
  AF_COUNTRY,
  AF_TRANSACTION_PROVIDER_ORG_REF,
  AF_PARTICIPATING_ORG_REF,
  AF_REPORTING_ORG_REF,
} from 'app/utils/getAPIFormattedFilters';

export function getDetailPageFilter(location: any, params: any) {
  const route = location.pathname.split("/")[1];
  if (route === "country") {
    return {
      [AF_COUNTRY]: [getCountryCode(params.param)],
    };
  }
  if (route === "donor") {
    return {
      [AF_TRANSACTION_PROVIDER_ORG_REF]: [params.param],
    };
  }
  if (route === "organisation") {
    return {
      [AF_PARTICIPATING_ORG_REF]: [params.param],
    };
  }
  if (route === "publisher") {
    return {
      [AF_REPORTING_ORG_REF]: [params.param],
    };
  }
  return {};
}
