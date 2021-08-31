import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import { PrimaryColor } from "app/theme";
import { BarNode } from "app/components/Charts/bar/common/node";
import { ResponsiveBar, BarItemProps } from "@nivo/bar";
import { BarChartProps, budgetLineKeys } from "app/components/Charts/bar/data";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";

export function BudgetLinesBarChart(props: BarChartProps) {
  const range = getRange(props.data, budgetLineKeys);
  const maxValue: number =
    max(
      props.data.map((item: any) => {
        let value = 0;
        budgetLineKeys.forEach((key: string) => {
          value += get(item, `[${key}]`, 0);
        });
        return value;
      })
    ) || 0;
  const [hoveredXIndex, setHoveredXIndex] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<any | null>(
    !props.height && props.data.length > 0
      ? {
          id: "",
          value: 0,
          index: 0,
          indexValue: props.data[props.data.length - 1].year,
          data: props.data[props.data.length - 1],
        }
      : null
  );

  const onSelect = (b: any | null) => {
    setSelected(b);
    props.setSelectedVizItem(get(b, "indexValue", ""));
  };

  const Bars = (bprops: any) => {
    return bprops.bars.map((bar: any) => (
      <BarNode
        {...bar}
        selected={selected}
        setSelected={onSelect}
        onZoomOut={props.onZoomOut}
        hoveredXIndex={hoveredXIndex}
        onNodeClick={props.onSelectChange}
        setHoveredXIndex={setHoveredXIndex}
      />
    ));
  };

  return (
    <div
      id="viz-scroller"
      css={`
        @media (max-width: 600px) {
          overflow-x: auto;
          overflow-y: hidden;

          &::-webkit-scrollbar {
            height: 4px;
            border-radius: 4px;
            background: ${PrimaryColor[2]};
          }

          &::-webkit-scrollbar-track {
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: ${PrimaryColor[0]};
          }

          ::-webkit-scrollbar-button {
            width: 0;
            height: 0;
            display: none;
          }

          ::-webkit-scrollbar-corner {
            background-color: transparent;
          }
        }
      `}
    >
      <div
        css={`
          width: 100%;
          position: relative;
          color: ${PrimaryColor[0]};
          height: ${props.height || 550}px;
          padding-top: ${!props.height ? "38px" : ""};
          padding-right: ${!props.height ? "72px" : ""};

          @media (max-width: 992px) {
            padding-right: ${!props.height ? "12px" : ""};
          }
          @media (max-width: 600px) {
            width: 1000px;
          }
        `}
      >
        <ResponsiveBar
          enableGridX
          padding={0.5}
          indexBy="year"
          data={props.data}
          enableLabel={false}
          enableGridY={false}
          innerPadding={0}
          layout="horizontal"
          keys={budgetLineKeys}
          valueScale={{ type: "linear" }}
          maxValue={maxValue + maxValue * 0.2}
          colors={(v: any) => get(v.data, `${v.id}Color`, "")}
          layers={["grid", "axes", Bars]}
          margin={{ top: 15, right: 0, bottom: 70, left: 45 }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 14,
                  fill: PrimaryColor[0],
                  fontFamily: "Finlandica",
                },
              },
              legend: {
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
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
          }}
          axisTop={{
            tickSize: 0,
            format: (v: any) => "",
          }}
          axisRight={{
            tickSize: 0,
            format: (v: any) => "",
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 15,
            tickRotation: 0,
            // tickValues: 5,
            legendOffset: 50,
            legend: range.abbr,
            format: (v: any) => getMoneyValueWithMetricPrefix(v, range.index),
          }}
        />
      </div>
    </div>
  );
}
