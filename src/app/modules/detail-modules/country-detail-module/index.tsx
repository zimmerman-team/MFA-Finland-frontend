import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { Path, AppName } from "app/const/Path";
import { useRouteMatch } from "react-router-dom";
import { getCountryName } from "app/utils/getCountryCode";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";

export function CountryDetailModule() {
  const { params } = useRouteMatch();
  const countryName = getCountryName(get(params, "country", ""));
  useTitle(`${AppName} - ${countryName}`);
  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home },
    { label: countryName },
  ];

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
    countryIndicators,
    unallocablePercentage,
  } = useDataGridData({
    detailPageFilter: {
      key: "recipient_country_code",
      value: get(params, "country", ""),
    },
  });

  return (
    <DetailModuleLayout
      crumbs={crumbs}
      label={countryName}
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
      countryIndicators={countryIndicators}
    />
  );
}
