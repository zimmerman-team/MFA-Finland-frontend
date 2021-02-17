import React from "react";
import { Treemap } from "app/components/Charts/treemap";
import { TreemapProps } from "app/components/Charts/treemap/data";
import { LocationsFragmentTable } from "app/components/Charts/table/modules/locations";
import {
  LocationsDataTableColumns,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";

interface CountriesRegionsModuleModel extends TreemapProps {
  activeTab: string;
  scrollableHeight: number;
}

export function CountriesRegionsModule(props: CountriesRegionsModuleModel) {
  if (props.activeTab === "chart") {
    return (
      <Treemap
        label=""
        data={props.data}
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
        type="location"
        data={props.data.children}
        options={SectorsDataTableOptions}
        columns={LocationsDataTableColumns}
        title={`${props.data.children.length} regions/countries`}
      />
    </div>
  );
}
