import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const geomapActivities: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/geo/activities`),
};

export default geomapActivities;
