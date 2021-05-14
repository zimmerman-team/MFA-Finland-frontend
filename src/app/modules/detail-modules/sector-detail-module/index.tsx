import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { Path, getAppName } from "app/const/Path";
import { useRouteMatch } from "react-router-dom";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

export function SectorDetailModule() {
  const { params } = useRouteMatch();
  const [currentLanguage] = useRecoilState(languageAtom);

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

  useTitle(
    `${detailPageNameData || get(params, "sector", "")} | ${getAppName(
      currentLanguage
    )}`
  );

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
