import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { RouteTab } from "app/components/VizTabs/common/Tab";
import { vizTabs, TabProps } from "app/components/VizTabs/data";

export function VizTabs() {
  return (
    <Grid
      container
      css={`
        padding: 0 100px;
        background: #dde4ef;
      `}
    >
      <Grid
        item
        sm={12}
        md={12}
        lg={4}
        xl={5}
        css={`
          padding: 12px 0;
        `}
      >
        <div css="width: 100%;height: 35px;" />
        <Typography variant="h5">Disbursements</Typography>
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={8}
        xl={7}
        css={`
          position: relative;
        `}
      >
        <div
          css={`
            right: 0;
            bottom: 11px;
            position: absolute;

            > a {
              border-right: 1px solid #dde4ef;
            }

            > a:first-of-type {
              border-radius: 15px 0px 0px 0px;
            }

            > a:last-of-type {
              border-right-style: none;
              border-radius: 0px 15px 0px 0px;
            }
          `}
        >
          {vizTabs.map((tab: TabProps) => (
            <RouteTab key={tab.name} name={tab.name} url={tab.url} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
