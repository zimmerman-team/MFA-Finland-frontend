// @ts-nocheck
import React from "react";
import { css } from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { PillButton } from "app/components/Buttons/PillButton";
import { DescriptionLabelStyle } from "app/modules/project-detail-module/style";
import { TransactionsBar } from "app/components/Charts/bar/variations/transactions";
import { DataTable } from "app/components/Charts/table";
import {
  TransactionsDataTableColumns,
  TransactionsDataTableOptions,
  transactionsTableTheme,
} from "app/components/Charts/table/data";

interface TransactionsProps {
  data: any;
}

interface TransactionsProps {}

export const Transactions = (props: TransactionsProps) => {
  const [activeTab, setActiveTab] = React.useState("chart");

  const styles = {
    container: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    `,
    tabContainer: css`
      display: flex;

      button:first-of-type {
        margin-right: 16px;
      }
    `,
    contentContainer: css`
      height: 458px;
      width: 100%;
    `,
  };

  const tab = (active: boolean) => {
    return css`
      height: 36px;
      padding: 9px 16px;
      border-radius: 22px;
      text-transform: unset;
      background-color: ${active ? PrimaryColor[0] : SecondaryColor[1]};
      color: ${active ? "white" : PrimaryColor[0]};
      box-shadow: none;

      :hover {
        background-color: ${active ? SecondaryColor[1] : PrimaryColor[0]};
      }
    `;
  };

  return (
    <>
      {/*Header with tabs*/}
      <div css={styles.container}>
        <Typography css={DescriptionLabelStyle}>Transactions</Typography>
        <div css={styles.tabContainer}>
          <PillButton
            css={tab(activeTab === "chart")}
            onClick={() => setActiveTab("chart")}
          >
            Chart
          </PillButton>
          <PillButton
            css={tab(activeTab === "table")}
            onClick={() => setActiveTab("table")}
          >
            Table
          </PillButton>
        </div>
      </div>

      {/*Rendered panel based on active tab*/}
      <div css={styles.contentContainer}>
        {activeTab === "chart" ? (
          <TransactionsBar data={props.data} />
        ) : (
          <DataTable
            options={TransactionsDataTableOptions}
            title={""}
            columns={TransactionsDataTableColumns}
            data={props.data}
            theme={transactionsTableTheme}
          />
        )}
      </div>
    </>
  );
};
