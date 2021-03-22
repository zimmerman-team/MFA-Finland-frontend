import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import { PrimaryColor } from "app/theme";
import { ResponsiveBar } from "@nivo/bar";
import { css } from "styled-components/macro";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";
import { TreemapTooltip } from "app/components/Charts/treemap/common/tooltip";

export const transactionsBarData = [
  {
    year: 2010,
    disbursed: 7,
    commitment: 2,
  },
  {
    year: 2011,
    disbursed: 9,
    commitment: 5,
  },
  {
    year: 2012,
    disbursed: 6,
    commitment: 1,
  },
  {
    year: 2013,
    disbursed: 7,
    commitment: 9,
  },
  {
    year: 2014,
    disbursed: 5,
    commitment: 4,
  },
  {
    year: 2015,
    disbursed: 9,
    commitment: 8,
  },
  {
    year: 2016,
    disbursed: 3,
    commitment: 9,
  },
  {
    year: 2017,
    disbursed: 3,
    commitment: 9,
  },
  {
    year: 2018,
    disbursed: 7,
    commitment: 2,
  },
  {
    year: 2019,
    disbursed: 7,
    commitment: 2,
  },
  {
    year: 2020,
    disbursed: 7,
    commitment: 2,
  },
];

interface TransactionsBarProps {
  data: any;
  cmsData: any;
}

const keys = ["disbursed", "commitment"];

export const TransactionsBar = (props: TransactionsBarProps) => {
  const range = getRange(props.data, keys);
  const values: number[] = [];
  props.data.forEach((item: any) => {
    keys.forEach((key: string) => {
      values.push(get(item, `[${key}]`, 0));
    });
  });
  const maxValue: number = max(values) || 0;

  const styles = {
    container: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    legendContainer: css`
      display: flex;
    `,
    legendItem: css`
      display: flex;

      :first-of-type {
        margin-right: 17px;
      }
    `,
    circle: css`
      width: 12px;
      height: 12px;
      background-color: red;
    `,
  };

  const circle = (color: string) => {
    return css`
      width: 12px;
      height: 12px;
      background-color: ${color};
      border-radius: 50%;
      margin-right: 8px;
      border: 0.3px solid #343249;
    `;
  };

  const colors: any = { commitment: "#233C71", disbursed: "#ACD1D1" };

  return (
    <>
      <div css={styles.container}>
        <div>{range.abbr}</div>
        <div css={styles.legendContainer}>
          <div css={styles.legendItem}>
            <div css={circle(colors.commitment)} />
            {get(props.cmsData, "viz.committed", "Committed")}
          </div>
          <div css={styles.legendItem}>
            <div css={circle(colors.disbursed)} />
            {get(props.cmsData, "viz.disbursed", "Disbursed")}
          </div>
        </div>
      </div>
      <ResponsiveBar
        keys={keys}
        padding={0.5}
        indexBy="year"
        borderWidth={0.5}
        innerPadding={3}
        data={props.data}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        maxValue={maxValue + maxValue * 0.2}
        colors={(bar: any) => colors[bar.id]}
        indexScale={{ type: "band", round: true }}
        margin={{ top: 20, right: 0, bottom: 25, left: 35 }}
        borderColor={{ from: "color", modifiers: [["darker", 2]] }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (v: any) => getMoneyValueWithMetricPrefix(v, range.index),
        }}
        axisTop={{
          tickSize: 0,
          format: (v: any) => "",
        }}
        axisRight={{
          tickSize: 0,
          format: (v: any) => "",
        }}
        enableLabel={false}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
          tooltip: {
            container: {
              padding: 15,
              borderRadius: 15,
            },
          },
        }}
        animate
        motionStiffness={90}
        motionDamping={15}
        tooltip={(tProps: any) => {
          return (
            <TreemapTooltip
              node={{
                data: {
                  name: tProps.data.year,
                  disbursed: tProps.data.disbursed,
                  committed: tProps.data.commitment,
                },
              }}
            />
          );
        }}
      />
    </>
  );
};
