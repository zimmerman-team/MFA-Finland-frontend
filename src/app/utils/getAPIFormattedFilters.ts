export function getAPIFormattedFilters(filters: any, yearPeriod?: string) {
  let result: any = {};
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
  if (filters.sectors.length > 0) {
    result = {
      ...result,
      sector_code: filters.sectors,
    };
  }
  if (filters.organisations.length > 0) {
    result = {
      ...result,
      participating_org_ref: filters.organisations,
    };
  }
  if (filters.activitystatus.length > 0) {
    result = {
      ...result,
      activity_status_code: filters.activitystatus,
    };
  }
  if (filters.activityscope.length > 0) {
    result = {
      ...result,
      activity_scope_code: filters.activityscope,
    };
  }
  if (filters.tag.length > 0) {
    result = {
      ...result,
      tag_narrative: filters.tag,
    };
  }
  if (filters.defaultaidtype.length > 0) {
    result = {
      ...result,
      default_aid_type_code: filters.defaultaidtype,
    };
  }
  if (filters.defaultflowtype.length > 0) {
    result = {
      ...result,
      default_flow_type_code: filters.defaultflowtype,
    };
  }
  if (filters.defaulttiedstatus.length > 0) {
    result = {
      ...result,
      default_tied_status_code: filters.defaulttiedstatus,
    };
  }
  if (filters.collaborationtype.length > 0) {
    result = {
      ...result,
      collaboration_type_code: filters.collaborationtype,
    };
  }
  if (filters.policymarker.length > 0) {
    result = {
      ...result,
      policy_marker_code: filters.policymarker,
    };
  }
  return result;
}
