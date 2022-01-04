import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import {
  getBudgetLinesLegendItems,
  getODALegendItems,
  getSimpleBarLegendItems,
} from "app/components/Charts/bar/utils";
import { getThematicAreasLegends } from "app/components/Charts/thematicareas/utils";
import { getSectorsLegends } from "app/components/Charts/sunburst/utils";
import { getTreemapLegends } from "app/components/Charts/treemap/utils";

export function getSidebarLegendItems(
  vizType: string,
  data: any,
  filter: string | number | null,
  cmsData: any,
  thematicAreaChartSingle: boolean,
  hideODAGNI: boolean,
  currentLanguage: string
): VizSidePanelItemProps[] {
  switch (vizType) {
    case "oda":
      return getODALegendItems(data[vizType], cmsData, hideODAGNI);
    case "oda-drilldown":
      return getSimpleBarLegendItems(data[vizType], currentLanguage);
    case "thematic-areas":
      return getThematicAreasLegends(
        data[vizType],
        thematicAreaChartSingle,
        cmsData.priorityAreas
      );
    case "sectors":
      return getSectorsLegends(data[vizType], filter, currentLanguage);
    case "countries-regions":
      return getTreemapLegends(data[vizType], filter, currentLanguage);
    case "organisations":
      return getTreemapLegends(data[vizType], filter, currentLanguage);
    case "budget-lines":
      return getBudgetLinesLegendItems(data[vizType]);
    default:
      return [];
  }
}
