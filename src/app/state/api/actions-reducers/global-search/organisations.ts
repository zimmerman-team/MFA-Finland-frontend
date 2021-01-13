import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const organisations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/organisations`),
};

export default organisations;
