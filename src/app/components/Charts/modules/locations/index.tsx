import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { Treemap } from "app/components/Charts/treemap";
import { TreemapProps } from "app/components/Charts/treemap/data";
import { LocationsFragmentTable } from "app/components/Charts/table/modules/locations";
import {
  LocationsDataTableColumns,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";
import { MoreButton } from "app/components/Charts/bar/data";
import { useRouteMatch } from "react-router-dom";
import { getTranslatedCols } from "../../table/utils/getTranslatedCols";

interface CountriesRegionsModuleModel extends TreemapProps {
  activeTab: string;
  scrollableHeight: number;
  getActiveTabData: () => any;
}

export function CountriesRegionsModule(props: CountriesRegionsModuleModel) {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();

  if (props.activeTab === "chart") {
    return (
      <Treemap
        label="locations"
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
        options={{
          ...SectorsDataTableOptions,
          customToolbar: () => (
            <MoreButton data={props.getActiveTabData()} params={params} />
          ),
        }}
        columns={getTranslatedCols(LocationsDataTableColumns, cmsData)}
        title={`${props.data.children.length} ${get(
          cmsData,
          "viz.countriesregions",
          "regions/countries"
        ).toLowerCase()}`}
      />
    </div>
  );
}
