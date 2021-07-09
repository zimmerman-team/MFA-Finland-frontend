import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const aboutPage: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/about_page?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export const feedbackPage: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/feedback_page?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export const statementsPage: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/statements_page?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export const resultsPage: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/results_page?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};
