import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { DataGrid, DataGridProps } from "app/components/DataGrid";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleHeader } from "app/components/DetailModuleHeader";

interface ModuleProps extends DataGridProps {
  label: string;
  crumbs: BreadcrumbLinkModel[];
}
export const DetailModuleLayout = (props: ModuleProps) => {
  return (
    <ModuleContainer>
      <DetailModuleHeader label={props.label} crumbs={props.crumbs} />
      <DataGrid
        vizDataLoading={props.vizDataLoading}
        odaBarChartData={props.odaBarChartData}
        thematicAreasChartData={props.thematicAreasChartData}
        sectorsSunburstDataCount={props.sectorsSunburstDataCount}
        sectorsSunburstData={props.sectorsSunburstData}
        locationsTreemapData={props.locationsTreemapData}
        organisationsTreemapData={props.organisationsTreemapData}
        budgetLinesBarChartData={props.budgetLinesBarChartData}
        sdgVizData={props.sdgVizData}
        geoMapData={props.geoMapData}
        unallocablePercentage={props.unallocablePercentage}
      />
    </ModuleContainer>
  );
};
