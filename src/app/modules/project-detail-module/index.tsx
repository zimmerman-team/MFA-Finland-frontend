import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { ProjectDetailModuleLayout } from "app/modules/project-detail-module/layout";

const moduleName: string = "Project Detail";

export function ProjectDetailModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return (
    <React.Fragment>
      <ProjectDetailModuleLayout />
      <div
        css={`
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          z-index: -1;
          background-color: white;
        `}
      />
    </React.Fragment>
  );
}
