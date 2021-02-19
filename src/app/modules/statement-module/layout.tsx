import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { crumbs } from "app/modules/feedback-module/layout";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { PageOrnament } from "app/assets/PageOrnament";

const widgetContainer = (height: string | undefined, isHovered: boolean) => css`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 32px;
  flex-direction: column;
  background-color: #ffffff;
  padding: 32px;
  height: ${height || "328px"};
  box-shadow: ${isHovered
    ? "0 3px 6px rgba(46, 73, 130, 0.16), 0 3px 6px rgba(46, 73, 130, 0.23);"
    : ""};
  transition: box-shadow 0.3s ease-in-out;
`;

const privacyCrumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Statement" },
];

export const StatementModuleLayout = () => {
  return (
    <>
      <ModuleContainer>
        <Box width="100%" height="16px" />
        <Grid item lg={12}>
          <Breadcrumbs route={privacyCrumbs} />
        </Grid>

        <Grid item lg={12}>
          <div css={widgetContainer}>
            <Typography variant="h5">Statement</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially
            </Typography>
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};
