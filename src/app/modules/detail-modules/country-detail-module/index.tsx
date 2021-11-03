import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import useTitle from "react-use/lib/useTitle";
import { useRouteMatch } from "react-router-dom";
import { Path, getAppName } from "app/const/Path";
import { languageAtom } from "app/state/recoil/atoms";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";

export function CountryDetailModule() {
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
    countryData,
    unallocablePercentage,
  } = useDataGridData({
    detailPageFilter: {
      key: "recipient_country_code",
      value: get(params, "country", ""),
    },
  });

  useTitle(`${countryData.name} | ${getAppName(currentLanguage)}`);
  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
    { label: countryData.name, cmsKey: "" },
  ];

  return (
    <DetailModuleLayout
      crumbs={crumbs}
      label={countryData.name}
      vizDataLoading={vizDataLoading}
      odaBarChartData={odaBarChartData}
      flagCode={get(params, "country", "")}
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
        key: "recipient_country_code",
        value: get(params, "country", ""),
      }}
      countryData={countryData}
    />
  );
}
