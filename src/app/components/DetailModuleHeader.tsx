import { Grid } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

interface ModuleHeaderProps {
  label: string;
  crumbs: BreadcrumbLinkModel[];
}

export const DetailModuleHeader = (props: ModuleHeaderProps) => {
  return (
    <React.Fragment>
      <Grid item lg={12}>
        <Breadcrumbs route={props.crumbs} />
      </Grid>

      <Grid item lg={12}>
        <Typography
          variant="h5"
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
