import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { PageOrnament } from "app/assets/PageOrnament";

interface ModuleContainerProps {
  children: React.ReactNode;
}

export const ModuleContainer = (props: ModuleContainerProps) => (
  <React.Fragment>
    <Grid
      container
      spacing={2}
      css={`
        margin: 0;
        width: initial;
        position: relative;
        @media (max-width: 960px) {
          //border-radius: 16px;
          //padding: 16px 16px 16px 16px;
          //width: initial;
          margin-right: 16px;
          margin-left: 16px;
          width: calc(100% - 32px);
        }
      `}
    >
      {props.children}
    </Grid>
  </React.Fragment>
);
