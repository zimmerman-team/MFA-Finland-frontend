/* eslint-disable @typescript-eslint/camelcase */
import { getCountryCode } from "app/utils/getCountryCode";

export function getDetailPageFilter(location: any, params: any) {
  const route = location.pathname.split("/")[1];
  if (route === "country") {
    return {
      recipient_country_code: [getCountryCode(params.param)],
    };
  }
  if (route === "donor") {
    return {
      transaction_provider_org_ref: [params.param],
    };
  }
  if (route === "organisation") {
    return {
      participating_org_ref: [params.param],
    };
  }
  if (route === "publisher") {
    return {
      reporting_org_ref: [params.param],
    };
  }
  return {};
}
