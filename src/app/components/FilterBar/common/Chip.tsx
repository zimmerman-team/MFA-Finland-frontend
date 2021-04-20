import { Chip as MUIChip, ChipProps, useMediaQuery } from "@material-ui/core";
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
    min-height: 32px;
    height: unset;

    .MuiChip-label {
      padding-top: 7px;
      padding-bottom: 7px;
      white-space: break-spaces;
    }

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

    @media (max-width: 600px) {
      .MuiChip-label {
        white-space: nowrap;
        ::after {
          display: none;
        }
      }
    }
  `;
};

export const Chip = (props: ChipModel) => {
  const [expanded, setExpanded] = React.useState(props.values.length <= 1);
  const [label, setLabel] = React.useState(props.label);
  const mobile = useMediaQuery("(max-width: 600px)");

  React.useEffect(() => {
    if (!mobile) {
      if (expanded) {
        setLabel(props.values.map((value) => value.label).join("; "));
      } else {
        setLabel(props.label);
      }
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
