import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const locationsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/locations-treemap`),
};

export default locationsTreemap;
