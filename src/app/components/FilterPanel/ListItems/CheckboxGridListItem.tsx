import React from "react";
import { css } from "styled-components/macro";
import { Checkbox, Grid, Typography } from "@material-ui/core";
import { FilterOption } from "app/components/FilterPanel/data";

interface CheckboxListItemProps extends FilterOption {
  selectedItems: string[];
  onFilterCheckboxChange: (value: string) => void;
}

export const CheckboxGridListItem = (props: CheckboxListItemProps) => {
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
      @media (max-width: 600px) {
        font-size: 14px;
      }
    `,
  };

  return (
    <Grid container css={styles.detailsItem}>
      {props.children?.map((node) => {
        return (
          <Grid
            key={node.name}
            item
            xs={12}
            lg={6}
            css={styles.checkboxTypographyContainer}
          >
            <Checkbox
              css={styles.checkbox}
              color="default"
              checked={props.selectedItems.indexOf(node.code) > -1}
              onChange={() => props.onFilterCheckboxChange(node.code)}
            />
            <Typography variant="h6" css={styles.label}>
              {node.name}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};
