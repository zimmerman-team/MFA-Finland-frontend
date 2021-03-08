import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const searchThematicareas: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/thematic-areas`),
};

export default searchThematicareas;
