import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

interface ModuleHeaderProps {
  label: string;
  crumbs: BreadcrumbLinkModel[];
}

const bgColor = "#DDE4EF";

export const BasicModuleHeader = (props: ModuleHeaderProps) => {
  return (
    <React.Fragment>
      <Grid item lg={12}>
        <Breadcrumbs route={props.crumbs} />
      </Grid>

      <Grid item lg={12}>
        <Typography
          variant="h5"
          component="h2"
          css={`
            color: #2e4982;
          `}
        >
          {props.label}
        </Typography>
      </Grid>
    </React.Fragment>
  );
};
