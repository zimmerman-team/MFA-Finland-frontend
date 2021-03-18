import { Chip as MUIChip, ChipProps } from "@material-ui/core";
import { css } from "styled-components/macro";
import { PrimaryColor, ProjectPalette } from "app/theme";
import React from "react";
import svgoud from "./arrowRight.svg";

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;
interface PropsExtra {
  type: any;
  name: string;
  value: string;
  childs?: ChipModel[];
}
type ChipModel = SimpleSpread<ChipProps, PropsExtra>;

const chip = (expanded: boolean, hasChildren: boolean) => {
  return css`
    background-color: #fff;
    font-family: Finlandica;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: ${PrimaryColor[0]};

    ${hasChildren &&
    `
    .MuiChip-label::after {
      display: inline-block;
      content: url(${svgoud});
      margin-left: 8px;
      transform: ${expanded ? "rotate(180deg)" : ""};
    }
    `}

    cursor: ${hasChildren ? "pointer" : ""};

    .MuiChip-deleteIcon {
      color: ${PrimaryColor[0]};
      :hover {
        color: ${PrimaryColor[3]};
      }
    }
  `;
};

export const Chip = (props: ChipModel) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <MUIChip
      onClick={() => setExpanded(!expanded)}
      css={chip(expanded, true)}
      {...props}
    />
  );
};
