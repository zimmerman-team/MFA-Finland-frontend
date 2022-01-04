// @ts-nocheck
import React from "react";
import get from "lodash/get";
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
import { getTranslatedCols } from "app/components/Charts/table/utils/getTranslatedCols";

interface TransactionsProps {
  data: any;
}

export const Transactions = (props: TransactionsProps) => {
  // const [activeTab, setActiveTab] = React.useState("chart");

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

  // const tab = (active: boolean) => {
  //   return css`
  //     height: 36px;
  //     box-shadow: none;
  //     padding: 9px 16px;
  //     border-radius: 22px;
  //     text-transform: unset;
  //     color: ${active ? "white" : PrimaryColor[0]};
  //     background-color: ${active ? PrimaryColor[0] : SecondaryColor[1]};

  //     :hover {
  //       color: ${active ? PrimaryColor[0] : "white"};
  //       background-color: ${active ? SecondaryColor[1] : PrimaryColor[0]};
  //     }
  //   `;
  // };

  return (
    <>
      {/* Header with tabs */}
      <div css={styles.container}>
        <Typography css={DescriptionLabelStyle}>
          {get(props.cmsData, "viz.transactions", "Transactions")}
        </Typography>
        {/* <div css={styles.tabContainer}>
          <PillButton
            data-cy="PillButton-chart"
            css={tab(activeTab === "chart")}
            onClick={() => setActiveTab("chart")}
          >
            {get(props.cmsData, "general.chart", "Chart")}
          </PillButton>
          <PillButton
            data-cy="PillButton-table"
            css={tab(activeTab === "table")}
            onClick={() => setActiveTab("table")}
          >
            {get(props.cmsData, "general.table", "Table")}
          </PillButton>
        </div> */}
      </div>

      {/* Rendered panel based on active tab */}
      {/* <div css={styles.contentContainer}>
        {activeTab === "chart" ? (
          <TransactionsBar data={props.data} cmsData={props.cmsData} />
        ) : ( */}
      <DataTable
        title=""
        data={props.data}
        theme={transactionsTableTheme}
        options={TransactionsDataTableOptions}
        columns={getTranslatedCols(TransactionsDataTableColumns, props.cmsData)}
      />
      {/* )}
      </div> */}
    </>
  );
};
