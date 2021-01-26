import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName, Path } from "app/const/Path";
import { AboutModuleLayout } from "app/modules/about-module/layout";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

const moduleName: string = "About Module";

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: moduleName },
];

export function AboutModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <AboutModuleLayout label={moduleName} crumbs={crumbs} />;
}
