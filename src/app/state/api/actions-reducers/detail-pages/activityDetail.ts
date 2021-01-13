import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const activityDetail: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/activity-detail`),
};

export default activityDetail;
