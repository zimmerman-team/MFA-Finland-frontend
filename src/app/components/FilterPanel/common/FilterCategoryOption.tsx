import { css } from "styled-components/macro";
import { SecondaryColor } from "../../../theme";
import { Typography } from "@material-ui/core";
import { PillButton } from "../../Buttons/PillButton";
import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";

export interface FilterCategoryOptionProps {
  path: string;
  heading: string;
  label: string;
}

const styles = {
  container: css`
    margin-bottom: 32px;
  `,
  buttonHeading: css`
    margin-bottom: 12px;
    color: white;
  `,
  button: css`
    text-transform: unset;
    padding: 13px 16px;
    height: 48px;
    border-radius: 33px;
    background-color: ${SecondaryColor[1]};
    justify-content: start;

    font-family: Finlandica;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;

    :hover {
      background: #ecf1fa;
      color: #2e4982;
    }

    .MuiButton-label {
      justify-content: space-between;
    }
  `,
};

export const FilterCategoryOption = (props: FilterCategoryOptionProps) => {
  return (
    <div css={styles.container}>
      <Typography variant="h6" css={styles.buttonHeading}>
        {props.heading}
      </Typography>
      <PillButton
        css={styles.button}
        color="secondary"
        fullWidth
        endIcon={<ArrowForwardIos style={{ fontSize: 24 }} />}
      >
        {props.label}
      </PillButton>
    </div>
  );
};
