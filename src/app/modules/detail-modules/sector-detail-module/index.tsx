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
import { getName } from "app/components/Charts/sdg";

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
    sectorDescription,
    sectorNames,
  } = useDataGridData({
    detailPageFilter: {
      key: "sector_code",
      value: get(params, "sector", ""),
    },
  });

  const pageName = sectorNames[getName(currentLanguage)];

  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
    { label: pageName || get(params, "sector", ""), cmsKey: "" },
  ];

  useTitle(
    `${pageName || get(params, "sector", "")} | ${getAppName(currentLanguage)}`
  );

  return (
    <DetailModuleLayout
      label={pageName || get(params, "sector", "")}
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
