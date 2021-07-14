import React from "react";
import { GenericPageLayout } from "app/modules/generic-page-module/layout";
import { GenericPageModuleProps } from "app/modules/generic-page-module/interface";

export function GenricPageModule(props: GenericPageModuleProps) {
  return <GenericPageLayout {...props} />;
}
