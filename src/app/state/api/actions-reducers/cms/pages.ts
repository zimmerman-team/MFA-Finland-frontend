import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const pages: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/AboutPrivacyFeedbackStatement?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default pages;
