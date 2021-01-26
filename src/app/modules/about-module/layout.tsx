import { Box, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { BasicModuleHeader } from "app/components/BasicModuleHeader";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { ModuleContainer } from "app/components/ModuleContainer";

import React from "react";

interface ModuleProps {
  label: string;
  crumbs: BreadcrumbLinkModel[];
  data?: {};
}
const bgColor = "#DDE4EF";
export const AboutModuleLayout = (props: ModuleProps) => {
  return (
    <ModuleContainer>
      <div
        css={`
          position: fixed;
          background-color: white;
          left: 0;
          top: 148px;
          width: 100vw;
          height: 100vh;
          z-index: -1;
        `}
      />
      <div
        css={`
          z-index: -1;
          top: 64px;
          left: 0;
          position: fixed;
          background-color: ${bgColor};
          height: 84px;
          width: 100vw;
        `}
      />
      <BasicModuleHeader crumbs={props.crumbs} label={props.label} />
      <Grid item xs={12} lg={6}>
        <Box width="100%" height="32px" />
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially
        </Typography>
      </Grid>
    </ModuleContainer>
  );
};
