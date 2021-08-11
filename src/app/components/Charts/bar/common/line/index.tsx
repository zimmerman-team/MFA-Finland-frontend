import React from "react";
import max from "lodash/max";
import { PrimaryColor } from "app/theme";
import { ResponsiveLine } from "@nivo/line";
import { LineNodes } from "app/components/Charts/bar/common/line/node";
import { LineProps } from "app/components/Charts/bar/common/line/data";

export function Line(props: LineProps) {
  const maxValue: number =
    max(props.data[0].data.map((item: any) => item.y)) || 0;
  const Points = (pprops: any) => {
    return (
      <LineNodes
        {...pprops}
        tab-index={-1}
        hovered={props.hovered}
        selected={props.selected}
      />
    );
  };

  return (
    <ResponsiveLine
      tab-index={-1}
      data={props.data}
      margin={{ top: 10, right: 60, bottom: 60, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: maxValue + maxValue * 0.1,
      }}
      pointSize={6}
      colors={["#D495A7"]}
      layers={["axes", Points]}
      enableGridY={false}
      enableGridX={false}
      axisLeft={null}
      axisBottom={null}
      axisRight={{
        tickSize: 0,
        tickValues: 6,
        tickPadding: 5,
        tickRotation: 0,
      }}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 14,
              fill: PrimaryColor[0],
              fontFamily: "Finlandica",
            },
          },
          domain: {
            line: {
              strokeWidth: 1,
              stroke: "rgba(224, 224, 224, 0.4)",
            },
          },
        },
        grid: {
          line: {
            strokeWidth: 1,
            stroke: "rgba(224, 224, 224, 0.4)",
          },
        },
      }}
    />
  );
}
