import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const sunburst: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/sunburst`),
};

export default sunburst;
