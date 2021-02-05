import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const geoMap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/geo`),
};

export default geoMap;
