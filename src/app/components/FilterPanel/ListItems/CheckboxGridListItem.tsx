import { css } from "styled-components/macro";
import { Checkbox, Grid, Typography } from "@material-ui/core";
import React from "react";
import { FilterOption } from "../Card";

export const CheckboxGridListItem = (props: FilterOption) => {
  const styles = {
    detailsItem: css`
      display: flex;
      align-items: center;
    `,
    checkbox: css`
      color: white;
    `,
    checkboxTypographyContainer: css`
      display: flex;
      align-items: center;
    `,
    label: css`
      color: white;
    `,
  };

  return (
    <Grid container css={styles.detailsItem}>
      {props.children?.map((node) => {
        return (
          <Grid item xs={6} css={styles.checkboxTypographyContainer}>
            <Checkbox css={styles.checkbox} color="default" />
            <Typography variant="h6" css={styles.label}>
              {node.name}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
