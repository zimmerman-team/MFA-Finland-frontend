import React from "react";
import theme, { PrimaryColor } from "app/theme";

interface GeneralButtonProps {
  label: string;
  onClick?: Function;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
}

export const FilledButton = (props: GeneralButtonProps) => {
  // tidy up and make re-useable
  return (
    <button
      type="button"
      onClick={() => props.onClick && props.onClick()}
      css={`
        height: 36px;
        display: flex;
        outline: none;
        padding: 0 16px;
        user-select: none;
        border-style: none;
        align-items: center;
        border-radius: 22px;
        justify-content: center;
        cursor: ${props.disabled ? "unset" : "pointer"};
        background: ${props.backgroundColor
          ? props.backgroundColor
          : PrimaryColor[0]};
        font-family: "Finlandica";
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        color: ${props.color ? props.color : theme.palette.common.white};

        transition: background 150ms ease-in-out;

        &:hover {
          background: ${PrimaryColor[3]};
          color: ${theme.palette.common.white};
        }

        &:focus {
          filter: brightness(85%);
        }
      `}
    >
      {props.label}
    </button>
  );
};
