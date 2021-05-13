import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const tooltips: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/Tooltips?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default tooltips;
