import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const searchSectors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/sectors`),
};

export default searchSectors;
