import isEqual from "lodash/isEqual";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";

export function getAPIFormattedFilters(
  filters: SelectedFilterAtomModel,
  initialCheckURLSearchParams?: () => SelectedFilterAtomModel
) {
  let filtersToUse = filters;
  if (initialCheckURLSearchParams) {
    const updatedFilters = initialCheckURLSearchParams();
    if (!isEqual(filtersToUse, updatedFilters)) {
      filtersToUse = updatedFilters;
    }
  }
  let result: any = {};
  if (filtersToUse.countries.length > 0) {
    result = {
      ...result,
      recipient_country_code: filtersToUse.countries,
    };
  }
  if (filtersToUse.regions.length > 0) {
    result = {
      ...result,
      recipient_region_code: filtersToUse.regions,
    };
  }
  if (filtersToUse.sectors.length > 0) {
    result = {
      ...result,
      sector_code: filtersToUse.sectors,
    };
  }
  if (filtersToUse.organisations.length > 0) {
    result = {
      ...result,
      participating_org_ref: filtersToUse.organisations,
    };
  }
  if (filtersToUse.activitystatus.length > 0) {
    result = {
      ...result,
      activity_status_code: filtersToUse.activitystatus,
    };
  }
  if (filtersToUse.activityscope.length > 0) {
    result = {
      ...result,
      activity_scope_code: filtersToUse.activityscope,
    };
  }
  if (filtersToUse.tag.length > 0) {
    result = {
      ...result,
      tag_narrative: filtersToUse.tag,
    };
  }
  if (filtersToUse.sdg.length > 0) {
    result = {
      ...result,
      tag_code: filtersToUse.sdg,
    };
  }
  if (filtersToUse.defaultaidtype.length > 0) {
    result = {
      ...result,
      default_aid_type_code: filtersToUse.defaultaidtype,
    };
  }
  if (filtersToUse.defaultflowtype.length > 0) {
    result = {
      ...result,
      default_flow_type_code: filtersToUse.defaultflowtype,
    };
  }
  if (filtersToUse.defaulttiedstatus.length > 0) {
    result = {
      ...result,
      default_tied_status_code: filtersToUse.defaulttiedstatus,
    };
  }
  if (filtersToUse.collaborationtype.length > 0) {
    result = {
      ...result,
      collaboration_type_code: filtersToUse.collaborationtype,
    };
  }
  if (filtersToUse.policymarker.length > 0) {
    result = {
      ...result,
      policy_marker_code: filtersToUse.policymarker,
    };
  }
  if (filtersToUse.budgetlines.length > 0) {
    result = {
      ...result,
      budget_line: filtersToUse.budgetlines,
    };
  }
  if (filtersToUse.humanrights.length > 0) {
    result = {
      ...result,
      human_rights_approach: filtersToUse.humanrights,
    };
  }
  if (filtersToUse.years.length > 0) {
    result = {
      ...result,
      years: filtersToUse.years,
    };
  }
  return result;
}
