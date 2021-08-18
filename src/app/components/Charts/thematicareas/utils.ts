import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { DataProps } from "app/components/Charts/thematicareas/data";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";

export function getThematicAreasLegends(
  data: DataProps[],
  thematicAreaChartSingle: boolean,
  translatedPriorityAreas: { [key: string]: string }
): VizSidePanelItemProps[] {
  const items = orderBy(data, "size", "desc").map((d: DataProps) => ({
    id: d.name,
    name: get(
      translatedPriorityAreas,
      `${d.ref.split("|")[0].replace(/ /g, "")}`,
      d.area
    ),
    color: d.color,
    value: formatLocale(d.value),
    link: `/thematic-area/${d.ref}`,
  }));
  if (thematicAreaChartSingle) {
    return items.slice(0, 1);
  }
  return items;
}
