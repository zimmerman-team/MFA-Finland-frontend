import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const publishersTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/publishers`),
};

export default publishersTable;
