import { Chip as MUIChip, ChipProps } from "@material-ui/core";
import { css } from "styled-components/macro";
import { PrimaryColor, ProjectPalette } from "app/theme";
import React from "react";
import svgoud from "./arrowRight.svg";

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;
interface PropsExtra {
  type: any;
  label: string;
  values: { label: string; value: string }[];
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
  const [label, setLabel] = React.useState(props.label);
  React.useEffect(() => {
    if (expanded) {
      setLabel(props.values.map((value) => value.label).join("; "));
    } else {
      setLabel(props.label);
    }
  }, [expanded]);
  return (
    <MUIChip
      onClick={() => setExpanded(!expanded)}
      css={chip(expanded, props.values.length > 1)}
      {...props}
      label={label}
    />
  );
};
