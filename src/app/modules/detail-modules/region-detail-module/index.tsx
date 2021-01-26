import React from "react";
import useTitle from "react-use/lib/useTitle";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path, AppName } from "app/const/Path";

const moduleName: string = "Region Detail Module";
export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: moduleName },
];

export function RegionDetailModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <DetailModuleLayout label={moduleName} crumbs={crumbs} />;
}
