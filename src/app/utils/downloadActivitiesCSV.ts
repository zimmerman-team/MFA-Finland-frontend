import axios from "axios";
import get from "lodash/get";

export const sortKeys = {
  "Start date asc": "activity_date_start_actual asc",
  "Start date desc": "activity_date_start_actual desc",
  "End date asc": "activity_date_end_actual asc",
  "End date desc": "activity_date_end_actual desc",
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

const fields =
  "iati_identifier,title_narrative,activity_status_code,recipient_country_code,recipient_country_name,recipient_country_percentage,result_type,result_title_narrative,activity_date_iso_date,activity_date_type,activity_date_start_actual,activity_date_start_planned,activity_date_end_actual,activity_date_end_planned,activity_scope_code,description_narrative,description_type,humanitarian,humanitarian_scope_code,humanitarian_scope_narrative,humanitarian_scope_type,humanitarian_scope_vocabulary,humanitarian_scope_vocabulary_uri,last_updated_datetime,participating_org_narrative,participating_org_narrative_lang,participating_org_narrative_text,participating_org_ref,participating_org_role,participating_org_type,recipient_region_code,recipient_region_name,recipient_region_percentage,recipient_region_vocabulary,recipient_region_vocabulary_uri,reporting_org_narrative,reporting_org_ref,reporting_org_secondary_reporter,reporting_org_type_code,reporting_org_type_name,sector_code,sector_narrative,sector_percentage,sector_vocabulary,sector_vocabulary_uri";

function getQuery(filters: any, search: string, searchFields: string[]) {
  const filterKeys = Object.keys(filters);
  if (filterKeys.length === 0 && search.length === 0) {
    return "*:*";
  }

  let query = "";

  if (filterKeys.length > 0) {
    filterKeys.forEach((filterKey: string, index: number) => {
      query += `${filterKey}:(${filters[filterKey].join(" ")})${
        index === filterKeys.length - 1 ? "" : " AND "
      }`;
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

  return query;
}

export function downloadActivitiesCSV(
  filters: any,
  page: number,
  rows: number,
  sort: string,
  search: string | undefined,
  setLoading: Function
) {
  const sortstring = get(sortKeys, `[${sort || "Start date desc"}]`, "");
  const query = getQuery(filters, search || "", [
    "recipient_country_code",
    "title_narrative_text",
  ]);
  const url = `https://iati.cloud/search/activity?q=${query}&start=${
    page * rows
  }&sort=${sortstring}&rows=${rows}&wt=csv&fl=${fields}`;
  return axios.get(url).then((response) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${encodeURIComponent(response.data)}`
    );
    element.setAttribute("download", "aida-activities.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setLoading(false);
  });
}
