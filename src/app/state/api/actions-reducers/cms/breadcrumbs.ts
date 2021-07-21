import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const breadcrumbs: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/Breadcrumbs?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default breadcrumbs;
