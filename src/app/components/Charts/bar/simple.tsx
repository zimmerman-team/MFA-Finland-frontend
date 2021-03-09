import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import { ResponsiveBar } from "@nivo/bar";
import { useHistory } from "react-router-dom";
import { selectedFilterAtom } from "app/state/recoil/atoms";
import { SimpleBarChartProps } from "app/components/Charts/bar/data";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";

export function SimpleBarChart(props: SimpleBarChartProps) {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const range = getRange(props.data, ["value"]);
  const maxValue: number = max(props.data.map((item: any) => item.value)) || 0;

  return (
    <div
      css={`
        width: 100%;
        height: 650px;
        padding: 50px 0 0 20px;
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
        margin={{ top: 15, right: 20, bottom: 200, left: 50 }}
        borderWidth={0.5}
        borderColor="#343249"
        onClick={(node: any) => {
          setSelectedFilters({
            ...selectedFilters,
            budgetlines: [...selectedFilters.budgetlines, node.data.code],
          });
          setTimeout(
            () => history.push(`/viz/projects${history.location.search}`),
            200
          );
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 45,
          renderTick: (v: any) => {
            const splits = v.value.split(" ");
            let values = [];
            if (splits.length > 2) {
              splits.forEach((s: string, index: number) => {
                if (index % 3 === 0) {
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
                  css="font-size: 10px; fill: rgb(46, 73, 130); font-family: Finlandica;"
                >
                  {values.map((s: string, index: number) => (
                    <tspan x="0" y={index * 12} key={s}>
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
                fontSize: 12,
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
