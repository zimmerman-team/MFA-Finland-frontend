import React from "react";
import Flag from "react-world-flags";
import { Grid, Typography } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

interface ModuleHeaderProps {
  label: string;
  flagCode?: string;
  crumbs: BreadcrumbLinkModel[];
}

export const DetailModuleHeader = (props: ModuleHeaderProps) => {
  return (
    <React.Fragment>
      <Grid item lg={12}>
        <Breadcrumbs route={props.crumbs} />
      </Grid>
      <Grid
        item
        lg={12}
        css="display: flex;flex-direction: row;align-items: center;"
      >
        <Typography
          variant="h5"
          css={`
            color: #2e4982;
          `}
        >
          {props.label}
        </Typography>
        {props.flagCode && (
          <Flag
            code={props.flagCode}
            height={30}
            css="margin-left: 10px;border-radius: 6px;"
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
