// @ts-nocheck
import get from "lodash/get";
import { createWriteStream } from "app/utils/streamsaver";

export const sortKeys = {
  "Start date asc": "activity_date_start_actual asc",
  "Start date desc": "activity_date_start_actual desc",
  "End date asc": "activity_date_end_actual asc",
  "End date desc": "activity_date_end_actual desc",
  "Start date planned desc": "activity_date_start_planned desc",
  "Status asc": "activity_status_code asc",
  "Status desc": "activity_status_code desc",
  "Organisation asc": "index asc",
  "Organisation desc": "index desc",
  "Publisher asc": "index asc",
  "Publisher desc": "index desc",
  "Donor asc": "index asc",
  "Donor desc": "index desc",
  "Activities count asc": "count asc",
  "Activities count desc": "count desc",
  "IATI ref asc": "index asc",
  "IATI ref desc": "index desc",
};

const stickyPeriodFilter = `activity_date_start_actual_f:[2015-01-01T00:00:00Z TO *] OR activity_date_start_planned_f:[2015-01-01T00:00:00Z TO *]`;

const fields =
  "iati_identifier,title_narrative,activity_status_code,recipient_country_code,recipient_country_name,recipient_country_percentage,result_type,result_title_narrative,activity_date_iso_date,activity_date_type,activity_date_start_actual,activity_date_start_planned,activity_date_end_actual,activity_date_end_planned,activity_scope_code,description_narrative,description_type,humanitarian,humanitarian_scope_code,humanitarian_scope_narrative,humanitarian_scope_type,humanitarian_scope_vocabulary,humanitarian_scope_vocabulary_uri,last_updated_datetime,participating_org_narrative,participating_org_narrative_lang,participating_org_narrative_text,participating_org_ref,participating_org_role,participating_org_type,recipient_region_code,recipient_region_name,recipient_region_percentage,recipient_region_vocabulary,recipient_region_vocabulary_uri,reporting_org_narrative,reporting_org_ref,reporting_org_secondary_reporter,reporting_org_type_code,reporting_org_type_name,sector_code,sector_narrative,sector_percentage,sector_vocabulary,sector_vocabulary_uri,budget_value_usd";
export const activityTransactionsFields =
  "iati_identifier,reporting_org_ref,title_narrative,activity_description_narrative,activity_recipient_country_code,activity_recipient_region_code,activity_sector_code,transaction_ref,transaction_humanitarian,transaction_type,transaction_date_iso_date,transaction_value_currency,transaction_value_date,transaction_value,transaction_usd_conversion_rate,transaction_value_usd,transaction_provider_org_ref,transaction_provider_org_provider_activity_id,transaction_provider_org_type,transaction_provider_org_narrative_text,transaction_receiver_org_ref,transaction_receiver_org_receiver_activity_id,transaction_receiver_org_type,transaction_receiver_org_narrative,transaction_disburstment_channel_code,transaction_sector_vocabulary,transaction_sector_code,transaction_recipient_country_code,transaction_recipient_region_code,transaction_flow_type_code,transaction_finance_type_code,transaction_aid_type_code,transaction_aid_type_vocabulary,transaction_tied_status_code,transaction_description_narrative";

export function getQuery(filters: any, search: string, searchFields: string[]) {
  if (typeof filters === "string") {
    return getFormattedSearchParam(filters);
  }
  const filterKeys = Object.keys(filters);
  if (filterKeys.length === 0 && search.length === 0) {
    return `reporting_org_ref:FI-3 AND (${stickyPeriodFilter})`;
  }

  let query = "";
  if (filterKeys.length > 0) {
    filterKeys.forEach((filterKey: string, index: number) => {
      if (filterKey === "budget_value") {
        query += `${filterKey}:[${filters[filterKey].join(" TO ")}]${
          index === filterKeys.length - 1 ? "" : " AND "
        }`;
      } else if (filterKey === "years") {
        query += `activity_date_start_actual_f:[${
          filters[filterKey][0]
        }-01-01T00:00:00Z TO ${
          filters[filterKey][1]
        }-12-31T23:59:59Z] OR activity_date_start_planned_f:[${
          filters[filterKey][0]
        }-01-01T00:00:00Z TO ${filters[filterKey][1]}-12-31T23:59:59Z]${
          index === filterKeys.length - 1 ? "" : " AND "
        }`;
      } else if (filterKey === "tag_code") {
        query += `${filterKey}:(${filters[filterKey]
          .map((value: string) => `"${value}"`)
          .join(" ")})`;
      } else if (filterKey === "budget_line") {
        query += `tag_code:(${filters[filterKey]
          .map((value: string) => `"${value}"`)
          .join(" ")})`;
      } else if (filterKey === "human_rights_approach") {
        query += `tag_narrative:(${filters[filterKey]
          .map((value: string) => `"${value}"`)
          .join(" ")})`;
      } else if (filterKey === "period") {
        query += `(activity_date_start_actual_f: [${
          filters[filterKey][0].startDate
        } TO *] OR activity_date_start_planned_f: [${
          filters[filterKey][0].startDate
        } TO *]) AND (activity_date_end_actual_f: [* TO ${
          filters[filterKey][0].endDate
        }] OR activity_date_end_planned_f: [* TO ${
          filters[filterKey][0].endDate
        }])${index === filterKeys.length - 1 ? "" : " AND "}\`;`;
      } else if (filterKey === "year_period") {
        query += `(activity_date_start_actual_f:[${
          filters[filterKey]
        }-01-01T00:00:00Z TO ${
          filters[filterKey]
        }-12-31T23:59:59Z] OR activity_date_start_planned_f:[${
          filters[filterKey]
        }-01-01T00:00:00Z TO ${filters[filterKey]}-12-31T23:59:59Z])${
          index === filterKeys.length - 1 ? "" : " AND "
        }`;
      } else {
        query += `${filterKey}:(${filters[filterKey].join(" ")})${
          index === filterKeys.length - 1 ? "" : " AND "
        }`;
      }
    });
  }

  if (search.length > 0 && filterKeys.length > 0) {
    query += " AND (";
    query += searchFields
      .map((field: string) => `${field}:(${search})`)
      .join(" OR ");
    query += ")";
  }

  if (search.length > 0 && filterKeys.length <= 0) {
    query += searchFields
      .map((field: string) => `${field}:(${search})`)
      .join(" OR ");
  }

  if (filterKeys.indexOf("years") === -1) {
    query += `${query.length > 0 ? " AND " : ""}(${stickyPeriodFilter})`;
  }

  return `reporting_org_ref:FI-3 AND (${query})`;
}

export function downloadActivitiesCSV(
  filters: any,
  sort?: string,
  search?: string,
  count?: number,
  ref?: string
): Promise<void> {
  const sortstring = get(sortKeys, `[${sort || "Start date desc"}]`, "");
  const query = getQuery(filters, search || "", [
    "recipient_country_code",
    "title_narrative_text",
  ]);
  const url = `https://iati.cloud/search/activity?q=${query}&sort=${sortstring}&rows=${
    count || 20000
  }&wt=csv&fl=${fields}`;
  return downloadFile(url, `activities${ref ? `-${ref}` : ""}.csv`);
}

export function downloadTransactionsCSV(
  activityRef: string,
  filter: string,
  count: number
): Promise<void> {
  const url = `https://iati.cloud/search/transaction?q=iati_identifier:${encodeURIComponent(
    activityRef
  )} AND ${filter}&rows=${count}&wt=csv&fl=${activityTransactionsFields}`;
  return downloadFile(url, `aida-transactions-${activityRef}.csv`);
}

export function downloadFile(url: string, fileName: string) {
  return fetch(url)
    .then((res) => {
      const fileStream = createWriteStream(fileName);
      const writer = fileStream.getWriter();
      if (res.body.pipeTo && globalThis.WritableStream) {
        writer.releaseLock();
        return res.body.pipeTo(fileStream);
      }

      const reader = res.body.getReader();
      const pump = () =>
        reader
          .read()
          .then(({ value, done }) =>
            done ? writer.close() : writer.write(value).then(pump)
          );

      return pump();
    })
    .catch((error) => console.error(error));
}
