import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { DataGrid, DataGridProps } from "app/components/DataGrid";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleHeader } from "app/components/DetailModuleHeader";

interface ModuleProps extends DataGridProps {
  label: string;
  flagCode?: string;
  crumbs: BreadcrumbLinkModel[];
}

export const DetailModuleLayout = (props: ModuleProps) => {
  return (
    <ModuleContainer>
      <DetailModuleHeader
        label={props.label}
        crumbs={props.crumbs}
        flagCode={props.flagCode}
        countryData={props.countryData}
      />
      <DataGrid
        sdgVizData={props.sdgVizData}
        geoMapData={props.geoMapData}
        countryData={props.countryData}
        vizDataLoading={props.vizDataLoading}
        odaBarChartData={props.odaBarChartData}
        detailPageFilter={props.detailPageFilter}
        sectorDescription={props.sectorDescription}
        sectorsSunburstData={props.sectorsSunburstData}
        locationsTreemapData={props.locationsTreemapData}
        unallocablePercentage={props.unallocablePercentage}
        thematicAreasChartData={props.thematicAreasChartData}
        budgetLinesBarChartData={props.budgetLinesBarChartData}
        organisationsTreemapData={props.organisationsTreemapData}
        sectorsSunburstDataCount={props.sectorsSunburstDataCount}
      />
    </ModuleContainer>
  );
};
