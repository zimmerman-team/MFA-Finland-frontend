import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { formatLocale } from "app/utils/formatLocale";
import { VizSidePanelItemProps } from "app/components/VizSidePanel/data";
import { budgetLineKeys } from "./data";

/* eslint-disable no-plusplus */
const ranges = [
  { divider: 1e9, suffix: "Bn", abbr: "€ BLN" },
  { divider: 1e6, suffix: "MM", abbr: "€ MLN" },
  { divider: 1e3, suffix: "k", abbr: "€ K" },
];

export function getRange(data: any, fields: string[]) {
  const rangesCount = [0, 0, 0];

  data.forEach((item: any) => {
    let v = 0;
    fields.forEach((field: string) => {
      v += get(item, field, 0);
    });
    if (item.y >= ranges[0].divider) {
      rangesCount[0]++;
    } else if (v >= ranges[1].divider) {
      rangesCount[1]++;
    } else if (v >= ranges[2].divider) {
      rangesCount[2]++;
    }
  });

  if (rangesCount[0] > rangesCount[1])
    return {
      index: 0,
      abbr: ranges[0].abbr,
    };
  if (rangesCount[1] > rangesCount[2])
    return {
      index: 1,
      abbr: ranges[1].abbr,
    };
  return {
    index: 2,
    abbr: ranges[2].abbr,
  };
}

export function getMoneyValueWithMetricPrefix(
  n: number,
  rangeIndex: number
): string {
  if (rangeIndex) {
    return (n / ranges[rangeIndex].divider).toString();
  }
  for (let i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return (n / ranges[i].divider).toString();
    }
  }
  return n.toString();
}

export function getODALegendItems(
  data: any,
  cmsData: any
): VizSidePanelItemProps[] {
  return orderBy(data, "year", "desc").map((d: any) => {
    if (d.year < 2020) {
      return {
        id: d.year,
        name: `${d.year} Total ODA`,
        value: formatLocale(get(d, "exclusive", 0) + get(d, "other", 0)),
        children: [
          {
            id: "Exclusive ODA",
            name: get(cmsData, "viz.exclusiveoda", "Exclusive ODA"),
            value: formatLocale(get(d, "exclusive", 0)),
            color: get(d, "exclusiveColor", ""),
          },
          {
            id: "Other ODA",
            name: get(cmsData, "viz.otheroda", "Other ODA"),
            value: formatLocale(get(d, "other", 0)),
            color: get(d, "otherColor", ""),
          },
          {
            id: "ODA/GNI",
            name: "ODA/GNI",
            value: `${get(d, "gni", 0)}%`,
            color: get(d, "gniColor", ""),
          },
        ],
      };
    }
    return {
      id: d.year,
      name: `${d.year} Total ODA`,
      value: formatLocale(get(d, "exclusive", 0) + get(d, "other", 0)),
      children: [
        {
          id: "Exclusive ODA",
          name: get(cmsData, "viz.exclusiveoda", "Exclusive ODA"),
          value: formatLocale(get(d, "exclusive", 0)),
          color: get(d, "exclusiveColor", ""),
        },
        {
          id: "Other ODA",
          name: get(cmsData, "viz.otheroda", "Other ODA"),
          value: formatLocale(get(d, "other", 0)),
          color: get(d, "otherColor", ""),
        },
      ],
    };
  });
}

export function getSimpleBarLegendItems(data: any): VizSidePanelItemProps[] {
  return orderBy(data, "value", "desc").map((d: any) => ({
    id: d.line,
    name: d.line,
    value: formatLocale(get(d, "value", 0)),
    color: get(d, "valueColor", ""),
  }));
}

export function getBudgetLinesLegendItems(data: any): VizSidePanelItemProps[] {
  return orderBy(data, "year", "desc").map((d: any) => {
    let value = 0;
    const children: VizSidePanelItemProps[] = [];
    budgetLineKeys.forEach((key: string) => {
      value += get(d, `[${key}]`, 0);
      if (get(d, `[${key}]`, 0) > 0) {
        children.push({
          id: key,
          name: key,
          value: get(d, `[${key}]`, 0),
          color: get(d, `[${key}Color]`, "0"),
        });
      }
    });
    return {
      id: d.year,
      name: `${d.year}`,
      value: formatLocale(value),
      children: orderBy(children, "value", "desc").map((c: any) => ({
        ...c,
        value: formatLocale(c.value),
      })),
    };
  });
}
