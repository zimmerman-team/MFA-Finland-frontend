// @ts-nocheck

import { Box, Tab, useMediaQuery } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { ActivityAccordion } from "app/components/ActivityAccordion";
import {
  ActivityAccordionState,
  ActivityItemProps,
  activityList,
} from "app/components/ActivityAccordion/model";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { ElementBackground } from "app/components/ElementBackground";
import { InPageNavigation } from "app/components/InPageNavigation";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Path } from "app/const/Path";
import { metaData } from "app/modules/project-detail-module/common/metaData";
import {
  FieldOneStyle,
  FieldTwoStyle,
  TextHighlightStyle,
  DescriptionLabelStyle,
} from "app/modules/project-detail-module/style";
import theme, { PrimaryColor, SecondaryColor } from "app/theme";
import { GridSpacingFix } from "app/utils/GridSpacingFix";
import React from "react";
import { useRecoilState } from "recoil";
import get from "lodash/get";
import { TotalDisbursements } from "./common/Disbursements";
import { css } from "styled-components/macro";
import { FilledButton } from "../../components/Buttons/FilledButton";
import { PillButton } from "../../components/Buttons/PillButton";
import {
  TransactionsBar,
  transactionsBarData,
} from "../../components/Charts/bar/variations/transactions";

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Explore", path: Path.explore },
  { label: "Activity Detail" },
];

export const ProjectDetailModuleLayout = () => {
  const mobile = useMediaQuery(theme.breakpoints.up("md"));
  const [activeNavItem, setActiveNavItem] = React.useState(0);

  const [activityListState, setActivityListState] = useRecoilState<
    ActivityItemProps[]
  >(ActivityAccordionState);

  function handleNavItemClick(id: any) {
    setActiveNavItem(parseInt(id, 10));
    setActivityListState((prevState) => {
      const updateItem = {
        ...activityList[id],
        expanded: true,
      };
      const newState = [...activityList];
      newState[id] = updateItem;
      return [...newState];
    });
  }

  return (
    <ModuleContainer>
      {/* ------------------------------------ */}
      {/* breadcrumb */}
      <Box width="100%" height="8px" />
      <Grid item xs={12} lg={12}>
        <Breadcrumbs route={crumbs} />
      </Grid>
      <Box width="100%" height="16px" />

      {/* ------------------------------------------------------------------ */}
      {/* header */}
      <Grid
        item
        container
        xs={12}
        lg={12}
        css={`
          position: relative;
          background-color: #f7f7f7;
        `}
      >
        <Box width="100%" height="24px" />
        {/* ----------------------------------- */}
        {/* id */}
        <Grid
          item
          xs={12}
          lg={12}
          css={`
            z-index: 1;
          `}
        >
          <Typography css={FieldOneStyle}>
            {"props.metadata.reporting_org_narrative"} |{" "}
            {"props.metadata.reporting_org_ref"} |{" "}
            {"props.metadata.reporting_org_type"}
          </Typography>
        </Grid>
        <Box width="100%" height="18px" />

        {/* ----------------------------------- */}
        {/* header */}
        <Grid
          item
          xs={12}
          lg={12}
          css={`
            z-index: 1;
          `}
        >
          <Typography css={FieldTwoStyle}>{"props.metadata.title"}</Typography>
        </Grid>
        <Box width="100%" height="24px" />

        {/* ----------------------------------- */}
        {/* info */}
        <Grid
          item
          container
          xs={12}
          lg={12}
          css={`
            z-index: 1;
          `}
        >
          <Typography css={FieldOneStyle}>
            {"props.metadata.iati_identifier"}
          </Typography>
          <Box width="100px" />
          <Typography css={FieldOneStyle}>
            activities from{" "}
            <span css={TextHighlightStyle}>{"props.metadata.dates[0]"}</span> To{" "}
            <span css={TextHighlightStyle}>{"props.metadata.dates[1]"}</span>{" "}
          </Typography>
        </Grid>

        <Box width="100%" height="24px" />
        <ElementBackground backgroundColor="#f7f7f7" />
      </Grid>

      <Box width="100%" height="24px" />

      {/* ------------------------------------------------------------------ */}
      {/* description */}
      <Grid item container xs={12} lg={12}>
        <Grid item lg={12}>
          <Typography css={DescriptionLabelStyle}>Description</Typography>
          <Box width="100%" height="16px" />
          <Typography>{"props.metadata.description"}</Typography>
        </Grid>
        <Box width="100%" height="60px" />
      </Grid>

      {/* ------------------------------------------------------------------ */}
      {/* total disbursements */}
      <Grid item xs={12} lg={12}>
        <Typography css={DescriptionLabelStyle}>Total Disbursements</Typography>
        <TotalDisbursements
          totalDisbursements={7000}
          totalCommitments={10000}
        />
      </Grid>

      <Box width="100%" height="56px" />

      {/* ------------------------------------------------------------------ */}
      {/* transactions */}
      <Grid item xs={12} lg={12}>
        <Transactions />
        {/*<Typography css={DescriptionLabelStyle}>Transactions</Typography>*/}
      </Grid>

      <Box width="100%" height="56px" />

      <Grid item xs={12} lg={12}>
        <Typography css={DescriptionLabelStyle}>SDG's</Typography>
      </Grid>

      {/* ------------------------------------------------------------------ */}
      {/* SDG's */}
      <Hidden mdDown>
        <Grid item lg={3}>
          <div
            css={`
              position: sticky;
              top: 97px;
              margin-top: 16px;
            `}
          >
            <InPageNavigation
              active={activeNavItem}
              setActive={setActiveNavItem}
              setActivityListState={setActivityListState}
              lists={activityListState}
              handleClick={handleNavItemClick}
              actualData={metaData}
            />
          </div>
        </Grid>
      </Hidden>

      <Grid
        item
        container
        xs={12}
        md={12}
        lg={9}
        spacing={mobile ? 2 : 0}
        css={GridSpacingFix}
      >
        {activityListState.map((item: ActivityItemProps, index: number) => (
          <Grid item xs={12} lg={12} key={index}>
            <ActivityAccordion
              {...item}
              index={index}
              handleClick={handleNavItemClick}
              data={get(metaData, item.dataPath, null)}
            />
          </Grid>
        ))}
      </Grid>

      <Box width="100%" height="50vh" />
    </ModuleContainer>
  );
};

interface TransactionsProps {}

export const Transactions = (props: TransactionsProps) => {
  const [activeTab, setActiveTab] = React.useState("chart");

  const styles = {
    container: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      //margin-top: 72px;
      //align-items: center;
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
          <div>table</div>
        )}
      </div>
    </>
  );
};
