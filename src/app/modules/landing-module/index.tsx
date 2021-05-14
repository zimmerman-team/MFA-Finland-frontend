import React from "react";
import { getAppName } from "app/const/Path";
import useTitle from "react-use/lib/useTitle";
import { useDataGridData } from "app/hooks/useDataGridData";
import { LandingLayout } from "app/modules/landing-module/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

const moduleName = "Home";

export function LandingModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);

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
  } = useDataGridData({
    detailPageFilter: {
      key: "",
      value: "",
    },
  });

  return (
    <LandingLayout
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
