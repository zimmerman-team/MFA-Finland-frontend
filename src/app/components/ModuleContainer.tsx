import { Grid } from "@material-ui/core";
import React from "react";

interface ModuleContainerProps {
  children: React.ReactNode;
}

export const ModuleContainer = (props: ModuleContainerProps) => (
  <Grid container spacing={2}>
    {props.children}
  </Grid>
);
