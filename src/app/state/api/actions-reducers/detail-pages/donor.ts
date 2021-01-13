import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const donorDetail: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/donor-detail`),
};

export default donorDetail;
