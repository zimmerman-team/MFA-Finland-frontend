import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { DataProps } from "app/components/Charts/thematicareas/data";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";

export function getThematicAreasLegends(
  data: DataProps[],
  thematicAreaChartSingle: boolean
): VizSidePanelItemProps[] {
  const items = orderBy(data, "size", "desc").map((d: DataProps) => ({
    id: d.name,
    name: d.area,
    color: d.color,
    value: formatLocale(d.value),
  }));
  if (thematicAreaChartSingle) {
    return items.slice(0, 1);
  }
  return items;
}
