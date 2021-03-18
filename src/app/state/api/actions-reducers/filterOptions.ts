import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const locations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const sectors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const thematicareas: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const organisations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const sdgs: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const activitystatus: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const policymarkers: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const aidtypes: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const budgetlines: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
