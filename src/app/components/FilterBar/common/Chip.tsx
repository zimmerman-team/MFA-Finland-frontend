import { Chip as MUIChip, ChipProps } from "@material-ui/core";
import { css } from "styled-components/macro";
import { PrimaryColor, ProjectPalette } from "app/theme";
import React from "react";

type ChipModel = ChipProps;

const chip = css`
  background-color: #fff;
  font-family: Finlandica;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${PrimaryColor[0]};

  .MuiChip-deleteIcon {
    color: ${PrimaryColor[0]};
    :hover {
      color: ${PrimaryColor[3]};
    }
  }
`;

export const Chip = (props: ChipModel) => {
  return <MUIChip css={chip} {...props} />;
};
