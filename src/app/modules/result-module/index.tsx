import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { ResultModuleLayout } from "app/modules/result-module/layout";

const moduleName: string = "Result";

export function ResultModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <ResultModuleLayout />;
}
