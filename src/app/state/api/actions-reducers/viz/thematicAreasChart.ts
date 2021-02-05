import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const thematicAreasChart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/thematic-areas`),
};

export default thematicAreasChart;
