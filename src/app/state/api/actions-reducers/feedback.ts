import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const feedback: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/feedback`),
};

export default feedback;
