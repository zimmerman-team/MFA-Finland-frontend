import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const organisationsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/organisations-treemap`),
};

export default organisationsTreemap;
