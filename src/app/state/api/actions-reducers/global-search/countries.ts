import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const countries: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/countries`),
};

export default countries;
