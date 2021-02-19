import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { AboutModuleLayout } from "app/modules/about-module/layout";

const moduleName: string = "About";

export function AboutModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <AboutModuleLayout />;
}
