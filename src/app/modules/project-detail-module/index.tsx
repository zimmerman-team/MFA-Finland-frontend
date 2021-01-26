import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { ProjectDetailModuleLayout } from "app/modules/project-detail-module/layout";

const moduleName: string = "Project Detail";

export function ProjectDetailModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <ProjectDetailModuleLayout />;
}
