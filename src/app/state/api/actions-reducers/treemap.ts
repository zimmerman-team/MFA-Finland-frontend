import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const treemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/treemap`),
};

export default treemap;
