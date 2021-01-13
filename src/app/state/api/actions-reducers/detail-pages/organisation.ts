import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const organisationDetail: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/organisation-detail`),
};

export default organisationDetail;
