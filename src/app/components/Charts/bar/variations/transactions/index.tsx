import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { PrimaryColor } from "../../../../../theme";
import { css } from "styled-components/macro";

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
}

export const TransactionsBar = (props: TransactionsBarProps) => {
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
        <div>MLN</div>
        <div css={styles.legendContainer}>
          <div css={styles.legendItem}>
            <div css={circle(colors.commitment)} />
            Commitment
          </div>
          <div css={styles.legendItem}>
            <div css={circle(colors.disbursed)}></div>
            Disbursements
          </div>
        </div>
      </div>
      <ResponsiveBar
        data={props.data}
        keys={["disbursed", "commitment"]} //TODO: variable
        indexBy="year" //TODO: variable
        margin={{ top: 20, right: 0, bottom: 25, left: 28 }}
        padding={0.5}
        innerPadding={3}
        maxValue={10} //TODO: variable
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(bar: any) => colors[bar.id]}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 2]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legend: "year", //TODO: variable
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 5, //TODO: variable
        }}
        gridYValues={5} //TODO: variable
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
        }}
        isInteractive={true}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </>
  );
};
