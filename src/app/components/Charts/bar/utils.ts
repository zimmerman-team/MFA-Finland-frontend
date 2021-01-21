/* eslint-disable no-plusplus */
const ranges = [
  { divider: 1e9, suffix: "Bn", abbr: "BLN" },
  { divider: 1e6, suffix: "MM", abbr: "MLN" },
  { divider: 1e3, suffix: "k", abbr: "K" },
];

export function getRange(data: any, fields: string[]) {
  const rangesCount = [0, 0, 0];

  data.forEach((item: any) => {
    let v = 0;
    fields.forEach((field: string) => {
      v += item[field];
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
