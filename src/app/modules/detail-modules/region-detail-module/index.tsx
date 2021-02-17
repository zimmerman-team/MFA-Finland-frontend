import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { Path, AppName } from "app/const/Path";
import { useRouteMatch } from "react-router-dom";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";

const moduleName = "Region Detail Module";

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: moduleName },
];

export function RegionDetailModule() {
  useTitle(`${AppName} - ${moduleName}`);
  const { params } = useRouteMatch();

  const {
    vizDataLoading,
    odaBarChartData,
    thematicAreasChartData,
    sectorsSunburstDataCount,
    sectorsSunburstData,
    locationsTreemapData,
    organisationsTreemapData,
    budgetLinesBarChartData,
    sdgVizData,
    geoMapData,
    unallocablePercentage,
    detailPageNameData,
  } = useDataGridData({
    detailPageFilter: {
      key: "recipient_region_code",
      value: get(params, "region", ""),
    },
  });

  return (
    <DetailModuleLayout
      label={detailPageNameData || get(params, "region", "")}
      crumbs={crumbs}
      vizDataLoading={vizDataLoading}
      odaBarChartData={odaBarChartData}
      thematicAreasChartData={thematicAreasChartData}
      sectorsSunburstDataCount={sectorsSunburstDataCount}
      sectorsSunburstData={sectorsSunburstData}
      locationsTreemapData={locationsTreemapData}
      organisationsTreemapData={organisationsTreemapData}
      budgetLinesBarChartData={budgetLinesBarChartData}
      sdgVizData={sdgVizData}
      geoMapData={geoMapData}
      unallocablePercentage={unallocablePercentage}
    />
  );
}
