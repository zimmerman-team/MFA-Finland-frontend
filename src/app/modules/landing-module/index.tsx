import React from "react";
import { AppName } from "app/const/Path";
import useTitle from "react-use/lib/useTitle";
import { useDataGridData } from "app/hooks/useDataGridData";
import { LandingLayout } from "app/modules/landing-module/layout";

const moduleName = "Home";

export function LandingModule() {
  useTitle(`${AppName} - ${moduleName}`);
  const {
    odaBarChartData,
    thematicAreasChartData,
    sectorsSunburstDataCount,
    sectorsSunburstData,
    locationsTreemapData,
    organisationsTreemapData,
    budgetLinesBarChartData,
    sdgVizData,
    geoMapData,
  } = useDataGridData();

  return (
    <LandingLayout
      odaBarChartData={odaBarChartData}
      thematicAreasChartData={thematicAreasChartData}
      sectorsSunburstDataCount={sectorsSunburstDataCount}
      sectorsSunburstData={sectorsSunburstData}
      locationsTreemapData={locationsTreemapData}
      organisationsTreemapData={organisationsTreemapData}
      budgetLinesBarChartData={budgetLinesBarChartData}
      sdgVizData={sdgVizData}
      geoMapData={geoMapData}
    />
  );
}
