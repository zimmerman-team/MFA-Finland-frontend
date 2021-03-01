import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { Path, AppName } from "app/const/Path";
import { useRouteMatch } from "react-router-dom";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";

export function SectorDetailModule() {
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
    sectorDescription,
  } = useDataGridData({
    detailPageFilter: {
      key: "sector_code",
      value: get(params, "sector", ""),
    },
  });

  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home },
    { label: detailPageNameData || get(params, "sector", "") },
  ];
  useTitle(`${AppName} - ${detailPageNameData || get(params, "sector", "")}`);

  return (
    <DetailModuleLayout
      label={detailPageNameData || get(params, "sector", "")}
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
      detailPageFilter={{
        key: "sector_code",
        value: get(params, "sector", ""),
      }}
      sectorDescription={sectorDescription}
    />
  );
}
