import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const sdgViz: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/sdgs`),
};

export default sdgViz;
