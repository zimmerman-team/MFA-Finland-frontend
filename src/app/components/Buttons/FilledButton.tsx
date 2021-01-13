/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import theme from "app/theme";

interface GeneralButtonProps {
  label: string;
  onClick?: Function;
  backgroundColor?: string;
  disabled?: boolean;
}

export const FilledButton = (props: GeneralButtonProps) => {
  // tidy up and make re-useable
  return (
    <div
      onClick={() => props.onClick && props.onClick()}
      css={`
        padding-left: 20px;
        padding-right: 20px;
        height: 32px;
        right: 16px;
        background: ${props.backgroundColor
          ? props.backgroundColor
          : theme.palette.primary.main};
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: ${props.disabled ? "unset" : "pointer"};
        user-select: none;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1.25397px;
        color: ${theme.palette.common.white};

        transition: color 150ms;
        // &:hover {
        //   opacity: ${props.disabled
          ? "unset"
          : theme.palette.action.hoverOpacity};
        //
        // }
      `}
    >
      {props.label}
    </div>
  );
};
