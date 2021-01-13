import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const countryDetail: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/country-detail`),
};

export default countryDetail;
