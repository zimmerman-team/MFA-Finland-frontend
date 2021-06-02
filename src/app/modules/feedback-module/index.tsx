import React from "react";
import useTitle from "react-use/lib/useTitle";
import { getAppName } from "app/const/Path";
import { FeedbackLayout } from "app/modules/feedback-module/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

const moduleName = "Feedback";

export function FeedbackModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);

  return <FeedbackLayout />;
}
