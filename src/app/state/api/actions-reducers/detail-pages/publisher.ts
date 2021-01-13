import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const publisherDetail: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/publisher-detail`),
};

export default publisherDetail;
