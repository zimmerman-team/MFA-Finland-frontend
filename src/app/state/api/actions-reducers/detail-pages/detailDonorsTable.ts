import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const detailDonorsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/donors`),
};

export default detailDonorsTable;
