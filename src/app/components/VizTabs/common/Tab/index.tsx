import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { TabProps } from "app/components/VizTabs/data";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { NavLink, useRouteMatch } from "react-router-dom";

const tabcss = (active: boolean) => css`
  color: #fff;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s ease-in-out;
  background: ${active ? PrimaryColor[0] : SecondaryColor[1]};

  &:hover {
    color: #fff;
    background: ${PrimaryColor[0]};
  }
`;

export function RouteTab(props: TabProps) {
  const { params } = useRouteMatch();
  return (
    <NavLink
      to={props.url}
      css={tabcss(get(params, "tab", "") === props.url.split("/")[2])}
    >
      {props.name}
    </NavLink>
  );
}
