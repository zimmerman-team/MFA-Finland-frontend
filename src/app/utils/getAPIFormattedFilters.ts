export function getAPIFormattedFilters(filters: any, yearPeriod?: string) {
  let result = {};
  if (filters.countries.length > 0) {
    result = {
      ...result,
      recipient_country_code: filters.countries,
    };
  }
  if (filters.regions.length > 0) {
    result = {
      ...result,
      recipient_region_code: filters.regions,
    };
  }
  // TODO: filter on usd_value
  if (filters.budget.length > 0) {
    result = {
      ...result,
      budget_value: filters.budget,
    };
  }
  if (filters.sectors.length > 0) {
    result = {
      ...result,
      sector_code: filters.sectors,
    };
  }
  if (filters.donors.length > 0) {
    result = {
      ...result,
      transaction_provider_org_ref: filters.donors,
    };
  }
  if (filters.organisations.length > 0) {
    result = {
      ...result,
      participating_org_ref: filters.organisations,
    };
  }
  if (filters.publishers.length > 0) {
    result = {
      ...result,
      reporting_org_ref: filters.publishers,
    };
  }
  if (filters.period.length > 0) {
    const period = { ...filters.period[0] };
    if (typeof period.startDate === "string") {
      period.startDate = new Date(period.startDate);
    }
    if (typeof period.endDate === "string") {
      period.endDate = new Date(period.endDate);
    }
    result = {
      ...result,
      period: [period],
    };
  }
  if (yearPeriod && yearPeriod.length > 0) {
    result = {
      ...result,
      year_period: yearPeriod,
    };
  }
  if (filters.activitystatus.length > 0) {
    result = {
      ...result,
      activity_status_code: filters.activitystatus,
    };
  }
  return result;
}
