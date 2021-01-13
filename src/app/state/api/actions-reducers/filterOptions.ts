import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const countries: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const regions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const sectors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const donors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const organisations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const publishers: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
export const activitystatus: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-group-options`),
};
