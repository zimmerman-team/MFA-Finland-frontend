import React from "react";
import { Grid } from "@material-ui/core";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PageFloatingButtons } from "app/components/PageFloatingButtons";

interface ModuleContainerProps {
  children: React.ReactNode;
}

export const ModuleContainer = (props: ModuleContainerProps) => {
  const location = useLocation();

  const isLandingOrDetail = [
    "/",
    "/regions",
    "/countries",
    "/sectors",
    "/organisations",
    "/organisation-types",
    "/thematic-area",
  ].includes(location.pathname);

  const mobile = useMediaQuery("(max-width:960px)");

  const styles = {
    container: css`
      width: 100%;
      display: flex;
      //background-color: white;
    `,
    gridContainer: css`
      width: 100%;
      padding: 0 64px;
      position: relative;
      z-index: 1;
      @media (max-width: 992px) {
        padding: 0 12px;
        margin: 0;
      }

      @media (max-width: 600px) {
        margin: 0px;
        padding: 0 4px;
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
    <main id="main" css={styles.container}>
      <Grid container spacing={2} css={styles.gridContainer}>
        {props.children}
      </Grid>
      {isLandingOrDetail && !mobile && <PageFloatingButtons />}
    </main>
  );
};
