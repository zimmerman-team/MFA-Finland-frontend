import React from "react";
import Flag from "react-world-flags";
import { Grid, Typography } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

interface ModuleHeaderProps {
  label: string;
  flagCode?: string;
  countryData?: any;
  crumbs: BreadcrumbLinkModel[];
}

export const DetailModuleHeader = (props: ModuleHeaderProps) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Breadcrumbs route={props.crumbs} />
      </Grid>
      <Grid item xs={12} css="display: flex;justify-content: space-between;">
        <div
          css={`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
          data-cy="common-module-header"
        >
          <Typography
            variant="h5"
            component="h2"
            css={`
              color: #002561;
            `}
          >
            {props.label}
          </Typography>
          {props.flagCode && (
            <Flag code={props.flagCode} height={30} css="margin-left: 10px;" />
          )}
        </div>
        {props.countryData && (
          <div
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;

              > div {
                margin-right: 35px;

                > span {
                  position: relative;
                  &:before {
                    top: 5px;
                    left: -15px;
                    content: "";
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    position: absolute;
                    background: #002561;
                  }
                }
              }
            `}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
