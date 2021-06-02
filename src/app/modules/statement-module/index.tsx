import React from "react";
import useTitle from "react-use/lib/useTitle";

import { getAppName } from "app/const/Path";
import { StatementModuleLayout } from "app/modules/statement-module/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

const moduleName = "Statement";

export function StatementModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);

  return <StatementModuleLayout />;
}
