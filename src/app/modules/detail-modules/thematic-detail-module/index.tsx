import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import useTitle from "react-use/lib/useTitle";
import { useRouteMatch } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { Path, getAppName } from "app/const/Path";
import { languageAtom } from "app/state/recoil/atoms";
import { useDataGridData } from "app/hooks/useDataGridData";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { DetailModuleLayout } from "app/modules/detail-modules/common/layout";

const moduleName = "Thematic Detail Module";

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: moduleName },
];

export function ThematicDetailModule() {
  const [currentLanguage] = useRecoilState(languageAtom);

  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);

  const { params } = useRouteMatch();
  const cmsData = useCMSData({ returnData: true });

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
      key: "tag_narrative",
      value: `${decodeURIComponent(get(params, "theme", ""))}| primary`,
    },
  });

  return (
    <DetailModuleLayout
      label={get(
        cmsData.priorityAreas,
        `${detailPageNameData.split("|")[0].replace(/ /g, "")}`,
        get(params, "theme", "")
      )}
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
        key: "tag_narrative",
        value: [
          `${decodeURIComponent(get(params, "theme", ""))}| primary`,
          `${decodeURIComponent(get(params, "theme", ""))}| secondary`,
        ],
      }}
    />
  );
}
