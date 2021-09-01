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
  cursor: pointer;
  margin-right: 15px;
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
  //opacity: 0.8;
  //color: #2e4063;

  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #2e4063;
  //color: red;
  //font-size: 14px;
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
      <Typography css={typographycss}>
        {props.count} {props.name}
      </Typography>
    </div>
  );
};
