import React from "react";
import max from "lodash/max";
import find from "lodash/find";
import { PrimaryColor } from "app/theme";
import { BarChartProps } from "app/components/Charts/bar/data";
import { BarNode } from "app/components/Charts/bar/common/node";
import { LineNodes } from "app/components/Charts/bar/common/line/node";
import { ResponsiveBar, BarItemProps, BarExtendedDatum } from "@nivo/bar";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";
import { Line } from "./common/line";

export function BarChart(props: BarChartProps) {
  const range = getRange(props.data, ["exclusive", "other"]);
  const maxValue: number =
    max(props.data.map((item: any) => item.exclusive + item.other)) || 0;
  const [hoveredXIndex, setHoveredXIndex] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<BarExtendedDatum>({
    id: "",
    value: 0,
    index: 0,
    indexValue: props.data[props.data.length - 1].year,
    data: props.data[props.data.length - 1],
  });

  const onSelect = (b: BarExtendedDatum) => {
    setSelected(b);
    props.setSelectedVizItem(b.indexValue);
  };

  const Bars = (bprops: any) => {
    return bprops.bars.map((bar: BarItemProps) => (
      <BarNode
        {...bar}
        selected={selected}
        setSelected={onSelect}
        hoveredXIndex={hoveredXIndex}
        // onZoomOut={props.onZoomOut}
        // onClick={props.onNodeClick}
        setHoveredXIndex={setHoveredXIndex}
      />
    ));
  };

  const LineWPoints = (lprops: any) => (
    <LineNodes {...lprops} selected={selected} hoveredXIndex={hoveredXIndex} />
  );

  React.useEffect(
    () => props.setSelectedVizItem(props.data[props.data.length - 1].year),
    []
  );

  React.useEffect(() => {
    if (props.selectedVizItemId) {
      const fItem = find(props.data, { year: props.selectedVizItemId });
      if (fItem) {
        setSelected({
          id: "",
          value: 0,
          index: 0,
          indexValue: fItem.year,
          data: fItem,
        });
      }
    }
  }, [props.selectedVizItemId]);

  return (
    <div
      css={`
        width: 100%;
        height: 400px;
        position: relative;
        color: ${PrimaryColor[0]};
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: calc(100% - 25px);
          justify-content: space-between;
        `}
      >
        <div>{range.abbr}</div>
        <div>%</div>
      </div>
      <div
        css={`
          left: 0;
          top: 14px;
          width: 100%;
          height: 400px;
          position: absolute;
        `}
      >
        <Line
          data={[
            {
              id: "gni",
              data: props.data.map((d: any) => ({
                x: d.year,
                y: d.gni,
              })),
            },
          ]}
        />
      </div>
      <ResponsiveBar
        padding={0.3}
        indexBy="year"
        data={props.data}
        enableLabel={false}
        enableGridY={false}
        innerPadding={0}
        keys={["exclusive", "other"]}
        valueScale={{ type: "linear" }}
        colors={["#ACD1D1", "#7491CE"]}
        maxValue={maxValue + maxValue * 0.1}
        layers={["grid", "axes", Bars, LineWPoints]}
        margin={{ top: 15, right: 50, bottom: 50, left: 40 }}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 14,
                fill: PrimaryColor[0],
                fontFamily: "Finlandica",
              },
            },
          },
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 15,
          tickRotation: 0,
          format: (v: any) => getMoneyValueWithMetricPrefix(v, range.index),
        }}
      />
    </div>
  );
}
