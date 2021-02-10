import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const budgetLinesBarChart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budget-line-bar-chart`),
};

export default budgetLinesBarChart;
