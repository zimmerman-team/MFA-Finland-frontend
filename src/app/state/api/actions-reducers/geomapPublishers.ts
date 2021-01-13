import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const geomapPublishers: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/geo/publishers`),
};

export default geomapPublishers;
