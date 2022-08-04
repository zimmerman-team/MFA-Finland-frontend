import {
  AF_COUNTRY,
  AF_REGION,
  AF_TAG_CODE,
  AF_SECTOR,
  AF_PARTICIPATING_ORG_REF,
} from 'app/utils/getAPIFormattedFilters';

export function getDetailPageInfo(routeData: any) {
  if (routeData.region) {
    return {
      detailPageFilter: {
        key: AF_REGION,
        value: routeData.region,
      },
    };
  }
  if (routeData.country) {
    return {
      detailPageFilter: {
        key: AF_COUNTRY,
        value: routeData.country,
      },
    };
  }
  if (routeData.sector) {
    return {
      detailPageFilter: {
        key: AF_SECTOR,
        value: routeData.sector,
      },
    };
  }
  if (routeData.organisation) {
    return {
      detailPageFilter: {
        key: AF_PARTICIPATING_ORG_REF,
        value: routeData.organisation,
      },
    };
  }
  if (routeData.theme) {
    return {
      detailPageFilter: {
        key: AF_TAG_CODE,
        value: routeData.theme,
      },
    };
  }
  return {};
}
