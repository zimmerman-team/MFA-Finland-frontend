import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const donors: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/donors`),
};

export default donors;
