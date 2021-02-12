import React from "react";
import { css } from "styled-components/macro";
import { PrimaryColor, SecondaryColor } from "../../../../theme";
import { Typography } from "@material-ui/core";
import { DescriptionLabelStyle } from "../../style";
import { PillButton } from "../../../../components/Buttons/PillButton";
import {
  TransactionsBar,
  transactionsBarData,
} from "../../../../components/Charts/bar/variations/transactions";
import { DataTable } from "../../../../components/Charts/table";
import {
  TransactionsDataTableColumns,
  TransactionsDataTableOptions,
} from "../../../../components/Charts/table/data";

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
          <TransactionsBar data={transactionsBarData} />
        ) : (
          <Table />
        )}
      </div>
    </>
  );
};

export const Table = () => {
  const data = [
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
    ["01. Jan-2001", "Project Name...", "$123,234.00", "$123,234.00"],
  ];
  //TODO: fix styling..
  return (
    <DataTable
      options={TransactionsDataTableOptions}
      title={""}
      columns={TransactionsDataTableColumns}
      data={data}
    />
  );
};
