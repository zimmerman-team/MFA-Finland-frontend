import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import find from "lodash/find";
import { PrimaryColor } from "app/theme";
import { Line } from "app/components/Charts/bar/common/line";
import { BarChartProps } from "app/components/Charts/bar/data";
import { BarNode } from "app/components/Charts/bar/common/node";
import { LineNodes } from "app/components/Charts/bar/common/line/node";
import { ResponsiveBar, BarItemProps, BarExtendedDatum } from "@nivo/bar";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";

export function BarChart(props: BarChartProps) {
  const range = getRange(props.data, ["exclusive", "other"]);
  const maxValue: number =
    max(props.data.map((item: any) => item.exclusive + item.other)) || 0;
  const [hoveredXIndex, setHoveredXIndex] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<BarExtendedDatum | null>(
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

  const onSelect = (b: BarExtendedDatum | null) => {
    setSelected(b);
    props.setSelectedVizItem(get(b, "indexValue", ""));
  };

  const Bars = (bprops: any) => {
    if (props.vizCompData.length !== bprops.bars.length) {
      props.setVizCompData(bprops.bars);
    }
    return bprops.bars.map((bar: BarItemProps) => (
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

  const showGni = find(props.data, (d: any) => d.gni > 0);

  const LineWPoints = (lprops: any) => {
    return showGni ? (
      <LineNodes
        {...lprops}
        selected={selected}
        height={props.height || 450}
        hoveredXIndex={hoveredXIndex}
      />
    ) : null;
  };

  React.useEffect(
    () =>
      props.setSelectedVizItem(
        get(props, "data[props.data.length - 1].year", null)
      ),
    []
  );

  React.useEffect(() => {
    if (props.selectedVizItemId) {
      const fItem = find(props.data, {
        year: parseInt(props.selectedVizItemId.toString(), 10),
      });
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
        padding-top: 50px;
        position: relative;
        color: ${PrimaryColor[0]};
        height: ${props.height || 450}px;
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
        <div
          css={`
            display: flex;

            > div {
              padding: 0 10px 0 15px;
              &:before {
                left: 0;
                top: 2px;
                position: absolute;
                width: 8px;
                height: 8px;
                content: "";
                border-radius: 50%;
              }
            }
          `}
        >
          <div
            css={`
              position: relative;
              &:before {
                background: #acd1d1;
              }
            `}
          >
            Exclusive ODA
          </div>
          <div
            css={`
              position: relative;
              &:before {
                background: #7491ce;
              }
            `}
          >
            Other ODA
          </div>
          <div
            css={`
              position: relative;
              &:before {
                background: #ae4764;
              }
            `}
          >
            ODA/GNI
          </div>
        </div>
        {showGni && <div>%</div>}
      </div>
      {showGni && (
        <div
          css={`
            left: 0;
            top: 14px;
            width: 100%;
            padding-top: 50px;
            position: absolute;
            height: ${props.height || 450}px;
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
      )}
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
        margin={{ top: 15, right: 50, bottom: 50, left: 50 }}
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
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 45,
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
