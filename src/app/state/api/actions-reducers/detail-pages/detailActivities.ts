import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const detailActivities: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/activities`),
};

export default detailActivities;
