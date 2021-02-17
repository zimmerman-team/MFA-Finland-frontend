export function getDetailPageInfo(routeData: any) {
  if (routeData.region) {
    return {
      detailPageFilter: {
        key: "recipient_region_code",
        value: routeData.region,
      },
    };
  }
  if (routeData.country) {
    return {
      detailPageFilter: {
        key: "recipient_country_code",
        value: routeData.country,
      },
    };
  }
  if (routeData.sector) {
    return {
      detailPageFilter: {
        key: "sector_code",
        value: routeData.sector,
      },
    };
  }
  if (routeData.organisation) {
    return {
      detailPageFilter: {
        key: "participating_org_ref",
        value: routeData.organisation,
      },
    };
  }
  if (routeData.theme) {
    return {
      detailPageFilter: {
        key: "tag_code",
        value: routeData.theme,
      },
    };
  }
  return {};
}
