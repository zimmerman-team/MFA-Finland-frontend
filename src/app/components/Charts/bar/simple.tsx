import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import { PrimaryColor } from "app/theme";
import { BarChartProps } from "app/components/Charts/bar/data";
import { ResponsiveBar, BarItemProps, BarExtendedDatum } from "@nivo/bar";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";

export function SimpleBarChart(props: BarChartProps) {
  const range = getRange(props.data, ["value"]);
  const maxValue: number = max(props.data.map((item: any) => item.value)) || 0;

  return (
    <div
      css={`
        width: 100%;
        height: 600px;
        color: ${PrimaryColor[0]};
      `}
    >
      {range.abbr}
      <ResponsiveBar
        padding={0.3}
        indexBy="line"
        keys={["value"]}
        innerPadding={0}
        data={props.data}
        enableLabel={false}
        tooltip={(v: any) => null}
        valueScale={{ type: "linear" }}
        maxValue={maxValue + maxValue * 0.1}
        colors={(v: any) => v.data.valueColor}
        margin={{ top: 15, right: 50, bottom: 200, left: 40 }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 45,
          renderTick: (v: any) => {
            const splits = v.value.split(" ");
            let values = [];
            if (splits.length > 2) {
              splits.forEach((s: string, index: number) => {
                if (index % 2 === 0) {
                  values.push(`${s} ${get(splits, `[${index + 1}]`, "")}`);
                }
              });
            } else {
              values = splits;
            }
            return (
              <g transform={`translate(${v.x},${v.y})`}>
                <text
                  textAnchor="start"
                  dominantBaseline="central"
                  transform="translate(0,10) rotate(45)"
                  css="font-size: 14px; fill: rgb(46, 73, 130); font-family: Finlandica;"
                >
                  {values.map((s: string, index: number) => (
                    <tspan x="0" y={index * 15}>
                      {s}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          },
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 15,
          tickRotation: 0,
          format: (v: any) => getMoneyValueWithMetricPrefix(v, range.index),
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
          },
          tooltip: {
            container: {
              display: "none",
            },
          },
        }}
      />
    </div>
  );
}
