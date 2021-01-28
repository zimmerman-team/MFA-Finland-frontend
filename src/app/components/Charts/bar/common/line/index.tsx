import React from "react";
import { PrimaryColor } from "app/theme";
import { ResponsiveLine } from "@nivo/line";
import { LineProps } from "app/components/Charts/bar/common/line/data";

export function Line(props: LineProps) {
  return (
    <ResponsiveLine
      data={props.data}
      margin={{ top: 5, right: 50, bottom: 50, left: 40 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
      }}
      layers={["axes", "grid"]}
      enableGridY
      enableGridX={false}
      axisLeft={null}
      axisBottom={null}
      axisRight={{
        tickSize: 0,
        tickValues: 5,
        tickPadding: 15,
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
