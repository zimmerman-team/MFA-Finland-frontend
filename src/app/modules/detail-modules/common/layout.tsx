import react from "react";
import React from "react";
import { Overline1Type } from "app/theme";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { DataGrid } from "app/components/DataGrid";
import { ModuleContainer } from "app/components/ModuleContainer";
import { DetailModuleHeader } from "app/components/DetailModuleHeader";

interface ModuleProps {
  label: string;
  crumbs: BreadcrumbLinkModel[];
  data?: {};
}
export const DetailModuleLayout = (props: ModuleProps) => {
  return (
    <ModuleContainer>
      <DetailModuleHeader label={props.label} crumbs={props.crumbs} />
      <DataGrid />
    </ModuleContainer>
  );
};
