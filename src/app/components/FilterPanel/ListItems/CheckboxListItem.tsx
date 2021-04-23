import React from "react";
import { css } from "styled-components/macro";
import { Checkbox, Typography } from "@material-ui/core";
import { CheckboxListItemProps } from "app/components/FilterPanel/data";

// This is the component that gets rendered if the data structure does not contain any children.
export const CheckboxListItem = (props: CheckboxListItemProps) => {
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      min-height: 42px;
      border-bottom: 1px solid white;
      margin-bottom: 16px;
      padding-bottom: 16px;
    `,
    checkbox: css`
      color: white;
    `,
    label: css`
      color: white;
      @media (max-width: 600px) {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
        //padding: initial;
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Checkbox
        color="default"
        css={styles.checkbox}
        checked={props.selected}
        onChange={(e: any) => props.onFilterCheckboxChange(props.code)}
      />
      <Typography variant="h6" css={styles.label}>
        {props.name}
      </Typography>
    </div>
  );
};
