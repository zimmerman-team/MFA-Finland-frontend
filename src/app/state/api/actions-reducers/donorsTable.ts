import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const donorsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/donors`),
};

export default donorsTable;
