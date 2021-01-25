import { DataGrid } from "app/components/DataGrid";
import { ModuleContainer } from "app/components/ModuleContainer";
import React from "react";

/* todo: evaluate if we need this one at all, seen as how the layout component that we use for detail modules is exactly the same*/

export const LandingLayout = () => {
  return (
    <ModuleContainer>
      <DataGrid />
    </ModuleContainer>
  );
};
