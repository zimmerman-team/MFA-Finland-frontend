/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { css } from "styled-components/macro";
import { Typography } from "@material-ui/core";

interface NavItemParams {
  name: string;
  count: number;
  index?: number;
  active: boolean;
  onClick: () => void;
}

const containercss = (active: boolean) => css`
  gap: 5px;
  display: flex;
  cursor: pointer;
  margin-right: 15px;
  flex-direction: row;
  padding-bottom: 8px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  transition: border-bottom-color 0.1s linear;
  border-bottom-color: ${active ? "#2e4063" : "transparent"};

  &:hover {
    border-bottom-color: #2e4063;
  }

  @media (max-width: 600px) {
    margin-right: 0;
  }
`;

const typographycss = css`
  color: #2e4063;
  font-size: 12px;
  white-space: pre;
  font-weight: bold;
  line-height: 18px;
  font-style: normal;
  text-transform: capitalize;

  &:hover {
    opacity: 0.8;
  }
`;

export const SearchResultNavItem = (props: NavItemParams) => {
  return (
    <div
      onClick={props.onClick}
      css={containercss(props.active)}
      data-cy={`search-nav-item-${props.index}`}
    >
      <div css={typographycss}>{props.count}</div>
      <div css={typographycss}>{props.name}</div>
    </div>
  );
};
