import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { GridWidget } from "./GridWidget";
import { Geomap } from "./Charts/geomap";
import { data } from "./Charts/geomap/data";
import { Legend } from "./Charts/geomap/common/Legend";

interface DataGridProps {
  data?: {};
}

export const DataGrid = (props: DataGridProps) => {
  return (
    <React.Fragment>
      {/* ----------------------------- */}
      {/*  row 1 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget label="Overview Disbursements" tooltip="lorem ipsum" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Thematic Areas" tooltip="lorem ipsum" />
      </Grid>

      {/* ----------------------------- */}
      {/*  row 2 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Sectors" tooltip="lorem ipsum" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Regions" tooltip="lorem ipsum" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Organisations" tooltip="lorem ipsum" />
      </Grid>

      {/* ----------------------------- */}
      {/*  row 3 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <GridWidget label="Budget Lines" tooltip="lorem ipsum" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Result" tooltip="lorem ipsum" />
      </Grid>

      {/* ----------------------------- */}
      {/*  row 4 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget label="SDG's" tooltip="lorem ipsum" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="About" tooltip="lorem ipsum" />
      </Grid>

      {/* ----------------------------- */}
      {/*  row 5 */}
      {/* ----------------------------- */}
      <Hidden smDown>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <GridWidget label="Map" height="680px">
            <Geomap geoData={data} />
            <Legend label={"Budget Amount"} startValue={0} totalValue={1000} />
          </GridWidget>
        </Grid>
      </Hidden>
    </React.Fragment>
  );
};
