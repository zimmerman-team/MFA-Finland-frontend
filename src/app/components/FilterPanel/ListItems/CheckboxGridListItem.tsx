import React from "react";
import { css } from "styled-components/macro";
import { Checkbox, Grid, Typography } from "@material-ui/core";
import { FilterOption } from "app/components/FilterPanel/data";

interface CheckboxListItemProps extends FilterOption {
  selectedItems: string[];
  onFilterCheckboxChange: (value: string | string[]) => void;
}

export const CheckboxGridListItem = (props: CheckboxListItemProps) => {
  const styles = {
    detailsItem: css`
      display: flex;
      align-items: center;
    `,
    checkbox: css`
      color: white;
      margin-left: 0;
    `,
    checkboxTypographyContainer: css`
      display: flex;
    `,
    label: css`
      color: white;
      padding-top: 12px;
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
            item
            xl={6}
            lg={6}
            md={6}
            xs={12}
            key={`${node.name}-${node.code}`}
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
