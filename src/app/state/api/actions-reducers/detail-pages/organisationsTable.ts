import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const organisationsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/organisations`),
};

export default organisationsTable;
