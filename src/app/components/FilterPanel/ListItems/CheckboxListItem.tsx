import { css } from "styled-components/macro";
import { Checkbox, Typography } from "@material-ui/core";
import React from "react";
import { FilterOption } from "../Card";

// This is the component that gets rendered if the data structure does not contain any children.
export const CheckboxListItem = (props: FilterOption) => {
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      height: 42px;
      border-bottom: 1px solid white;
      margin-bottom: 16px;
    `,
    checkbox: css`
      color: white;
    `,
    label: css`
      color: white;
    `,
  };

  return (
    <div css={styles.container}>
      <Checkbox css={styles.checkbox} color="default" />
      <Typography variant="h6" css={styles.label}>
        {props.name}
      </Typography>
    </div>
  );
};
