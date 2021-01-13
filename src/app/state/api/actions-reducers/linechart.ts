import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const linechart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/line`),
};

export default linechart;
