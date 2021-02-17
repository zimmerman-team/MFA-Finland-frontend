import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const detailPageName: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/detail-page-name`),
};

export default detailPageName;
