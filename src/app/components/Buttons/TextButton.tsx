/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import theme from "app/theme";
import { NavLink } from "react-router-dom";
import { css } from "styled-components/macro";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

interface TextButtonprops {
  label: string;
  path?: string;
  onClick?: Function;
}

const containercss = css`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: ${theme.palette.text.primary};

  transition: color 150ms;

  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

export const TextButton = (props: TextButtonprops) => {
  const [currentLanguage] = useRecoilState(languageAtom);

  return props.path ? (
    <NavLink
      css={containercss}
      to={
        props.path
          ? `/${currentLanguage === "se" ? "sv" : currentLanguage}${props.path}`
          : ""
      }
    >
      {props.label}
    </NavLink>
  ) : (
    <div css={containercss} onClick={() => props.onClick && props.onClick()}>
      {props.label}
    </div>
  );
};
