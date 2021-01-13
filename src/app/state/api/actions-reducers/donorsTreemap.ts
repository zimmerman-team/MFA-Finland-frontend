import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const donorsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/donors-treemap`),
};

export default donorsTreemap;
