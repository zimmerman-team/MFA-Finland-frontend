import React from "react";
import { css } from "styled-components/macro";
import { Checkbox, Typography } from "@material-ui/core";

export const CardHeader = () => {
  const styles = {
    container: css`
      position: sticky;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 12px;
      margin-bottom: 22px;

      @media (max-width: 600px) {
        margin-left: initial;
        margin-bottom: 12px;
      }
    `,
    checkbox: css`
      color: white;
    `,
    checkboxLabel: css`
      color: white;
      text-transform: unset;
      margin-right: 24px;
      @media (max-width: 600px) {
        margin-right: 0;
      }
    `,
  };
  return (
    <div css={styles.container}>
      <div />
      <span>
        <Checkbox id="select_all" css={styles.checkbox} color="default" />
        <Typography variant="button" css={styles.checkboxLabel}>
          Select all
        </Typography>
      </span>
    </div>
  );
};
