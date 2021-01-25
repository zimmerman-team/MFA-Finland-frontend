import { Grid } from "@material-ui/core";
import React from "react";
import { GridWidget } from "./GridWidget";

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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {/*@ts-ignore*/}
        <GridWidget label="Map" height="680px" />
      </Grid>
    </React.Fragment>
  );
};
