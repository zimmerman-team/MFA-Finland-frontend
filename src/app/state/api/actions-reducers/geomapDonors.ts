import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const geomapDonors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/geo/donors`),
};

export default geomapDonors;
