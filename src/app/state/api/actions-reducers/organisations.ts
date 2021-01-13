import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const organisations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/organisations`),
};

export default organisations;
