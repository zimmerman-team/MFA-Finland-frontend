import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const sectorsSunburst: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/sunburst`),
};

export default sectorsSunburst;
