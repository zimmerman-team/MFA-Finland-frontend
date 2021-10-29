// @ts-nocheck
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import {
  Box,
  useMediaQuery,
  Hidden,
  Typography,
  Grid,
} from "@material-ui/core";
import { Path } from "app/const/Path";
import {
  ActivityAccordionState,
  ActivityItemProps,
  activityList,
  ActivityDetailModuleLayoutProps,
} from "app/components/ActivityAccordion/model";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { ModuleContainer } from "app/components/ModuleContainer";
import { InPageNavigation } from "app/components/InPageNavigation";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { ActivityAccordion } from "app/components/ActivityAccordion";
import { ElementBackground } from "app/components/ElementBackground";
import {
  FieldOneStyle,
  FieldTwoStyle,
  TextHighlightStyle,
  DescriptionLabelStyle,
  DescriptionStyle,
} from "app/modules/project-detail-module/style";
import { SDGviz } from "app/components/Charts/sdg";
import theme from "app/theme";
import { GridSpacingFix } from "app/utils/GridSpacingFix";
import { useRecoilState } from "recoil";
import { SDGvizItemProps } from "app/components/Charts/sdg/data";
import { useCMSData } from "app/hooks/useCMSData";
import { TotalDisbursements } from "./common/Disbursements";
import { Transactions } from "./common/Transactions";

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
  { label: "Projects", path: "/viz/projects", cmsKey: "breadcrumbs.projects" },
  { label: "Activity Detail", cmsKey: "breadcrumbs.activity_detail" },
];

export const ProjectDetailModuleLayout = (
  props: ActivityDetailModuleLayoutProps
) => {
  const cmsData = useCMSData({ returnData: true });
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

  const hasSDGData = find(
    props.sdgVizData,
    (item: SDGvizItemProps) => item.committed > 0 || item.disbursed > 0
  );

  return (
    <ModuleContainer>
      {/* ------------------------------------ */}
      {/* breadcrumb */}
      <Hidden smDown>
        <Box width="100%" height="8px" />
      </Hidden>
      <Grid item xs={12} lg={12}>
        <Breadcrumbs route={crumbs} />
      </Grid>
      <Hidden smDown>
        <Box width="100%" height="16px" />
      </Hidden>

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
        <Hidden smDown>
          <Box width="100%" height="32px" />
        </Hidden>
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
            {props.metadata.reporting_org_narrative} |{" "}
            {props.metadata.reporting_org_ref} |{" "}
            {props.metadata.reporting_org_type}
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
          <Typography data-cy="project-detail-title" css={FieldTwoStyle}>
            {props.metadata.title}
          </Typography>
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
            {props.metadata.iati_identifier}
          </Typography>
          <Box width="100px" />
          <Typography css={FieldOneStyle}>
            activities from{" "}
            <span css={TextHighlightStyle}>
              <b>{props.metadata.dates[0]}</b>
            </span>{" "}
            To{" "}
            <span css={TextHighlightStyle}>
              <b>{props.metadata.dates[1]}</b>
            </span>{" "}
          </Typography>
        </Grid>
        <Hidden smDown>
          <Box width="100%" height="24px" />
        </Hidden>
        <ElementBackground backgroundColor="#f7f7f7" />
      </Grid>

      <Box width="100%" height="24px" />

      {/* ------------------------------------------------------------------ */}
      {/* description */}
      <Grid item container xs={12} lg={12}>
        <Grid item lg={10}>
          <Typography css={DescriptionLabelStyle}>
            {get(cmsData, "general.description", "Description")}
          </Typography>
          <Box width="100%" height="16px" />
          <Typography css={DescriptionStyle}>
            {props.metadata.description}
          </Typography>
        </Grid>
        <Box width="100%" height="60px" />
      </Grid>

      {/* ------------------------------------------------------------------ */}
      {/* total disbursements */}
      <Grid item xs={12} lg={12}>
        <Typography css={DescriptionLabelStyle}>
          {get(cmsData, "viz.totaldisbursements", "Total disbursements")}
        </Typography>
        <TotalDisbursements
          totalCommitments={props.commitmentsTotal}
          totalDisbursements={props.disbursementsTotal}
          cmsData={cmsData}
        />
      </Grid>

      <Box width="100%" height="60px" />

      {/* ------------------------------------------------------------------ */}
      {/* transactions */}
      <Grid item xs={12} lg={12}>
        <Transactions data={props.transactions} cmsData={cmsData} />
      </Grid>

      <Box width="100%" height="60px" />

      {/* ------------------------------------------------------------------ */}
      {/* SDG's */}
      {hasSDGData && (
        <>
          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            id="sdg-container"
            css={`
              position: relative;
            `}
          >
            <Typography css={DescriptionLabelStyle}>SDGs</Typography>
            <Box width="100%" height="15px" />
            <SDGviz data={props.sdgVizData} containerId="sdg-container" />
          </Grid>
          <Box width="100%" height="60px" />
        </>
      )}

      <Hidden mdDown>
        <Grid item lg={3}>
          <div
            css={`
              top: 140px;
              margin-top: 16px;
              position: sticky;
            `}
          >
            <InPageNavigation
              cmsData={cmsData}
              active={activeNavItem}
              setActive={setActiveNavItem}
              setActivityListState={setActivityListState}
              lists={activityListState}
              handleClick={handleNavItemClick}
              actualData={props.metaData}
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
          <Grid item xs={12} lg={12} key={item.id}>
            <ActivityAccordion
              {...item}
              index={index}
              handleClick={handleNavItemClick}
              label={get(cmsData, item.cmsKey, item.label)}
              data={get(props.metadata, item.dataPath, null)}
            />
          </Grid>
        ))}
      </Grid>

      <Box width="100%" height="20vh" />
    </ModuleContainer>
  );
};
