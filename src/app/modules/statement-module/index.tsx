import React from "react";
import useTitle from "react-use/lib/useTitle";

import { AppName } from "app/const/Path";
import { StatementModuleLayout } from "app/modules/statement-module/layout";

const moduleName: string = "Statement";

export function StatementModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <StatementModuleLayout />;
}
