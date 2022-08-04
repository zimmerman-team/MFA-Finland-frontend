import isEqual from "lodash/isEqual";
import { SelectedFilterAtomModel } from "app/state/recoil/atoms";

// A
export const AF_ACTIVITY_SCOPE_CODE = 'activity-scope.code';
export const AF_ACTIVITY_STATUS_CODE = 'activity-status.code';

// B
export const AF_BUDGET = 'budget.value-usd';

// C
export const AF_COUNTRY = 'recipient-country.code';
export const AF_COUNTRY_NAME = 'recipient-country.name';
export const AF_COLLABORATION_TYPE_CODE = 'collaboration-type.code';

// D
export const AF_DEFAULT_AID_TYPE_CATEGORY_CODE =
  'default_aid_type_category_code';
export const AF_DEFAULT_AID_TYPE_CODE = 'default-aid-type.code';
export const AF_DEFAULT_AID_TYPE_VOCABULARY = 'default-aid-type.vocabulary';
export const AF_DEFAULT_CURRENCY = 'default-currency';
export const AF_DEFAULT_FINANCE_CODE = 'default-finance-type.code';
export const AF_DEFAULT_FLOW_TYPE_CODE = 'default-flow-type.code';
export const AF_DEFAULT_LANG = 'lang';
export const AF_DOCUMENT_LINK_CATEGORY_CODE = 'document-link.category.code';
export const AF_DEFAULT_TIED_STATUS_CODE = 'default-tied-status.code';

// H
export const AF_HUMANITARIAN_SCOPE_TYPE = 'humanitarian-scope.code';
export const AF_HUMANITARIAN_SCOPE_VOCABULARY = 'humanitarian-scope.vocabulary';

// I
export const AF_IATI_VERSION = 'dataset.extras.iati_version';

// O
export const AF_OTHER_IDENTIFIER_TYPE = 'other-identifier.type';

// P
export const AF_PARTICIPATING_ORG_REF = 'participating-org.ref';
export const AF_PARTICIPATING_ORG_TYPE = 'participating-org.type';
export const AF_POLICY_MARKER_CODE = 'policy-marker.code';

// R
export const AF_REGION = 'recipient-region.code';
export const AF_REGION_NAME = 'recipient-region.name';
export const AF_REPORTING_ORG_REF = 'reporting-org.ref';
export const AF_REPORTING_ORG_TYPE_CODE = 'reporting-org.type';
export const AF_REPORTING_ORG_TYPE_NAME = 'reporting-org.type.name';
export const AF_REPORTING_ORG_SECONDARY_REPORTER =
  'reporting-org.secondary-reporter';

// S
export const AF_SECTOR = 'sector.code';
export const AF_SECTOR_VOCABULARY = 'sector.vocabulary';

// T
export const AF_TAG_CODE = 'tag.code';
export const AF_TAG_NARRATIVE = 'tag.narrative';
export const AF_TRANSACTION = 'transaction.value-usd';
export const AF_TRANSACTION_COUNTRY = 'transaction.recipient-country.code';
export const AF_TRANSACTION_FLOW_TYPE_CODE = 'transaction.flow-type.code';
export const AF_TRANSACTION_HUMANITARIAN = 'transaction.humanitarian';
export const AF_TRANSACTION_PROVIDER_ORG_REF = 'transaction.provider-org.ref';
export const AF_TRANSACTION_RECEIVER_ORG_REF = 'transaction.receiver-org.ref';
export const AF_TRANSACTION_REGION = 'transaction.recipient-region.code';
export const AF_TRANSACTION_TIED_STATUS_CODE = 'transaction.tied-status.code';
export const AF_TRANSACTION_TYPE_CODE = 'transaction.transaction-type.code';
export const AF_TRANSACTION_VALUE_CURRENCY = 'transaction.value.currency';

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
      [AF_COUNTRY]: filtersToUse.countries,
    };
  }
  if (filtersToUse.regions.length > 0) {
    result = {
      ...result,
      [AF_REGION]: filtersToUse.regions,
    };
  }
  if (filtersToUse.sectors.length > 0) {
    result = {
      ...result,
      [AF_SECTOR]: filtersToUse.sectors,
    };
  }
  if (filtersToUse.organisations.length > 0) {
    result = {
      ...result,
      [AF_PARTICIPATING_ORG_REF]: filtersToUse.organisations,
    };
  }
  if (filtersToUse.activitystatus.length > 0) {
    result = {
      ...result,
      [AF_ACTIVITY_STATUS_CODE]: filtersToUse.activitystatus,
    };
  }
  if (filtersToUse.activityscope.length > 0) {
    result = {
      ...result,
      [AF_ACTIVITY_SCOPE_CODE]: filtersToUse.activityscope,
    };
  }
  if (filtersToUse.tag.length > 0) {
    result = {
      ...result,
      [AF_TAG_NARRATIVE]: filtersToUse.tag,
    };
  }
  if (filtersToUse.sdg.length > 0) {
    result = {
      ...result,
      [AF_TAG_CODE]: filtersToUse.sdg,
    };
  }
  if (filtersToUse.defaultaidtype.length > 0) {
    result = {
      ...result,
      [AF_DEFAULT_AID_TYPE_CODE]: filtersToUse.defaultaidtype,
    };
  }
  if (filtersToUse.defaultflowtype.length > 0) {
    result = {
      ...result,
      [AF_DEFAULT_FLOW_TYPE_CODE]: filtersToUse.defaultflowtype,
    };
  }
  if (filtersToUse.defaulttiedstatus.length > 0) {
    result = {
      ...result,
      [AF_DEFAULT_TIED_STATUS_CODE]: filtersToUse.defaulttiedstatus,
    };
  }
  if (filtersToUse.collaborationtype.length > 0) {
    result = {
      ...result,
      [AF_COLLABORATION_TYPE_CODE]: filtersToUse.collaborationtype,
    };
  }
  if (filtersToUse.policymarker.length > 0) {
    result = {
      ...result,
      [AF_POLICY_MARKER_CODE]: filtersToUse.policymarker,
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
