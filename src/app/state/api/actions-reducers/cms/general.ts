import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const general: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/General?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default general;
