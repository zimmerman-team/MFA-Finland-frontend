import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const sectorProjects: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/activities-simple-table`),
};

export default sectorProjects;
