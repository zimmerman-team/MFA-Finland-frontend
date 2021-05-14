import React from "react";
import useTitle from "react-use/lib/useTitle";
import { ResultModuleLayout } from "app/modules/result-module/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { getAppName } from "app/const/Path";

const moduleName = "Result";

export function ResultModule() {
  const [currentLanguage] = useRecoilState(languageAtom);

  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);

  return <ResultModuleLayout />;
}
