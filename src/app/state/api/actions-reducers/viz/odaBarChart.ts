import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const odaBarChart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/oda`),
};

export default odaBarChart;
