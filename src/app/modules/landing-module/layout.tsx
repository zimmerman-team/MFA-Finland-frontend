import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { DataGrid, DataGridProps } from "app/components/DataGrid";

/* todo: evaluate if we need this one at all, seen as how the layout component that we use for detail modules is exactly the same */

export const LandingLayout = (props: DataGridProps) => {
  return (
    <ModuleContainer>
      <DataGrid {...props} />
    </ModuleContainer>
  );
};
