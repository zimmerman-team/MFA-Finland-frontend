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

const moduleName = "Organisation Detail Module";

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
  { label: moduleName, cmsKey: "breadcrumbs.organisation" },
];

export function OrganisationDetailModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);
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
      key: "participating_org_ref",
      value: get(params, "organisation", ""),
    },
  });

  return (
    <DetailModuleLayout
      label={detailPageNameData || get(params, "organisation", "")}
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
        key: "participating_org_ref",
        value: get(params, "organisation", ""),
      }}
    />
  );
}
