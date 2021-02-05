import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { FeedbackModuleLayout } from "app/modules/feedback-module/layout";

const moduleName: string = "Feedback";

export function FeedbackModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <FeedbackModuleLayout />;
}
