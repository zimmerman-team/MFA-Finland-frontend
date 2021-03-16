import React from "react";
import { Treemap } from "app/components/Charts/treemap";
import { TreemapProps } from "app/components/Charts/treemap/data";
import { LocationsFragmentTable } from "app/components/Charts/table/modules/locations";
import {
  SectorsDataTableOptions,
  OrganisationTypesDataTableColumns,
} from "app/components/Charts/table/data";

interface OrganisationsModuleModel extends TreemapProps {
  activeTab: string;
  scrollableHeight: number;
}

export function OrganisationsModule(props: OrganisationsModuleModel) {
  if (props.activeTab === "chart") {
    return (
      <Treemap
        data={props.data}
        label="organisations"
        selectedVizItemId={props.selectedVizItemId}
        setSelectedVizItem={props.setSelectedVizItem}
      />
    );
  }
  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;
      `}
    >
      <LocationsFragmentTable
        type="org"
        data={props.data.children}
        options={SectorsDataTableOptions}
        columns={OrganisationTypesDataTableColumns}
        title={`${props.data.children.length} organisation types`}
      />
    </div>
  );
}
