import React from "react";
import useTitle from "react-use/lib/useTitle";
import { AppName } from "app/const/Path";
import { FeedbackLayout } from "app/modules/feedback-module/layout";

const moduleName = "Feedback";

export function FeedbackModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <FeedbackLayout />;
}
