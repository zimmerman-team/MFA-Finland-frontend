import {
  Chip as MUIChip,
  ChipProps,
  Typography,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
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
          transform: ${expanded ? "" : "rotate(180deg)"};
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

  function handleClick() {
    if (!mobile) {
      if (expanded) {
        setLabel(props.label);
      } else {
        setLabel(props.values.map((value) => value.label).join("; "));
      }
    }
    setExpanded(!expanded);
  }

  return (
    <>
      <MUIChip
        onClick={() => handleClick()}
        css={chip(expanded, props.values.length > 1)}
        {...props}
        label={label}
      />
      {expanded && mobile && (
        <MobileTooltip {...props} handleClose={() => handleClick()} />
      )}
    </>
  );
};

interface MobileChipModel extends ChipModel {
  handleClose: () => void;
}

const MobileTooltip = (props: MobileChipModel) => {
  const mobileCSS = {
    container: css`
      background-color: ${PrimaryColor[0]};
      border-radius: 12px;
      padding: 16px;
      position: absolute;
      width: calc(100% - 32px);
      left: 16px;
      z-index: 9999;
      ul {
        columns: 2;
        list-style-type: none;
        padding: 0;
      }

      li {
        color: white;
        margin-bottom: 12px;
      }
    `,
    header: css`
      display: flex;
      justify-content: space-between;

      h6 {
        color: white;
      }
    `,
    button: css`
      transform: translate(16px, -18px);
    `,
    icon: css`
      color: white;
    `,
  };

  return (
    <div css={mobileCSS.container}>
      <div css={mobileCSS.header}>
        <Typography variant="subtitle2">{props.label}</Typography>
        <IconButton
          onClick={() => props.handleClose()}
          css={mobileCSS.icon}
          aria-label="cancel"
        >
          <CancelIcon css={mobileCSS.icon} />
        </IconButton>
      </div>
      <ul>
        {props.values.map((val: any) => (
          <li key={val}>{val.label}</li>
        ))}
      </ul>
    </div>
  );
};
