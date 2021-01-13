import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const detailPublishersTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/publishers`),
};

export default detailPublishersTable;
