import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import { getODALegendItems } from "app/components/Charts/bar/utils";
import { getThematicAreasLegends } from "app/components/Charts/thematicareas/utils";

export function getSidebarLegendItems(
  vizType: string,
  data: any
): VizSidePanelItemProps[] {
  switch (vizType) {
    case "oda":
      return getODALegendItems(data[vizType]);
    case "thematic-areas":
      return getThematicAreasLegends(data[vizType]);
    default:
      return [];
  }
}
