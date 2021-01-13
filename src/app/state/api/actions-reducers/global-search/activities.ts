import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const activities: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/activities`),
};

export default activities;
