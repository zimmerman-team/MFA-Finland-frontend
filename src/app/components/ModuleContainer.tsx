import { Grid, Hidden } from "@material-ui/core";
import React, { useState } from "react";
import { PageOrnament } from "app/assets/PageOrnament";
import IconButton from "@material-ui/core/IconButton";
import { Map, Share, CloudDownload } from "@material-ui/icons";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PageFloatingButtons } from "app/components/PageFloatingButtons";

interface ModuleContainerProps {
  children: React.ReactNode;
}

export const ModuleContainer = (props: ModuleContainerProps) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const mobile = useMediaQuery("(max-width:960px)");

  const styles = {
    container: css`
      display: flex;
    `,
    gridContainer: css`
      width: initial;
      margin: 0 64px;
      margin-right: ${isLanding ? "16px" : "64px"};
      position: relative;
      z-index: 1;
      @media (max-width: 960px) {
        //border-radius: 16px;
        //padding: 16px 16px 16px 16px;
        //width: initial;
        margin-right: 16px;
        margin-left: 16px;
        width: calc(100% - 32px);
      }
    `,
    iconContainer: css`
      display: flex;
      flex-direction: column;
      transform: translateX();
      margin-right: 25px;
    `,
    iconButton: css`
      width: 32px;
      height: 32px;
      margin-bottom: 16px;
      background: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
    `,
    icon: css`
      fill: ${PrimaryColor[0]};
    `,
  };

  return (
    <React.Fragment>
      <div css={styles.container}>
        <Grid container spacing={2} css={styles.gridContainer}>
          {props.children}
        </Grid>
        {isLanding && !mobile && <PageFloatingButtons />}
      </div>
    </React.Fragment>
  );
};
