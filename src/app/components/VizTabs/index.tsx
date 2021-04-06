import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { RouteTab } from "app/components/VizTabs/common/Tab";
import { vizTabs, TabProps } from "app/components/VizTabs/data";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { css } from "styled-components/macro";
import { Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { PrimaryColor, SecondaryColor } from "app/theme";

export function VizTabs() {
  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home },
    { label: "Disbursements" },
  ];
  const styles = {
    container: css`
      padding: 0 68px;
      height: 88px;
      background-color: red;
      //transform: translateY(-16px);

      @media (max-width: 992px) {
        height: 120px;
        padding: 0 12px;
      }
    `,
    tooltip: css`
      fill: ${PrimaryColor[0]};
      :hover {
        fill: ${PrimaryColor[3]};
      }
    `,
    titleContainer: css`
      display: flex;
      margin-top: 3px;
      margin-bottom: 16px;
    `,
    title: css`
      margin-right: 12px;
    `,
    background: css`
      //left: 0;
      //top: 136px;
      //width: 100vw;
      //height: 88px;
      //position: absolute;
      //background: #dde4ef;
      //
      //@media (max-width: 992px) {
      //  height: 120px;
      //}
    `,
    // tabContainer: css`
    //   //right: 0;
    //   //bottom: 11px;
    //   //position: absolute;
    //   //position: relative;
    //   //top: -21px;
    //   //margin-left: auto;
    //   //width: fit-content;
    //   //height: 35px;
    //
    //   @media (max-width: 992px) {
    //     margin-left: 36px;
    //     overflow-x: scroll;
    //     width: unset;
    //     white-space: nowrap;
    //   }
    //   > a {
    //     border-right: 1px solid #dde4ef;
    //   }
    //
    //   > a:first-of-type {
    //     border-radius: 15px 0px 0px 0px;
    //   }
    //
    //   > a:last-of-type {
    //     border-right-style: none;
    //     border-radius: 0px 15px 0px 0px;
    //   }
    // `,
    tabGrid: css`
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    `,
    tabsList: css`
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: auto;

      @media (max-width: 992px) {
        margin-left: 36px;
      }

      &::-webkit-scrollbar {
        width: 1px;
        height: 3px;
        background: #ededf6;
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: #ededf6;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #2e4063;
      }
    `,
  };

  return (
    <Grid container item xs={12} sm={12} css={styles.container}>
      {/* <div css={styles.background} /> */}
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
        css={`
          z-index: 1;
        `}
      >
        {/* <Hidden smDown> */}
        {/*  <div css="width: 100%;height: 35px;" /> */}
        {/* </Hidden> */}
        <div css="width: 100%; height: 8px;" />
        <Breadcrumbs route={crumbs} />
        <div css={styles.titleContainer}>
          <Typography variant="h5" css={styles.title}>
            Disbursements
          </Typography>
          <Tooltip title="lorem ipsum">
            <InfoOutlinedIcon css={styles.tooltip} />
          </Tooltip>
        </div>
        {/* <Hidden mdUp> */}
        {/*  <div css="width: 100%;height: 35px;" /> */}
        {/* </Hidden> */}
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} css={styles.tabGrid}>
        <ul css={styles.tabsList}>
          {vizTabs.map((tab: TabProps) => (
            <RouteTab key={tab.name} {...tab} />
          ))}
        </ul>
      </Grid>
      {/* <Grid */}
      {/*  item */}
      {/*  sm={12} */}
      {/*  md={12} */}
      {/*  lg={8} */}
      {/*  xl={8} */}
      {/*  css={` */}
      {/*    //position: relative; */}
      {/*    z-index: 1; */}
      {/*  `} */}
      {/* > */}
      {/*  <div css={styles.tabContainer}> */}
      {/*    {vizTabs.map((tab: TabProps) => ( */}
      {/*      <RouteTab key={tab.name} {...tab} /> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* </Grid> */}
    </Grid>
  );
}
