import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const odaBudgetLinesChart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budget-line-bar-chart`),
};

export default odaBudgetLinesChart;
