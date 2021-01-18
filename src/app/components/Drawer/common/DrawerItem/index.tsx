// @ts-nocheck
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MUIListItem from "@material-ui/core/ListItem";
import MUIListItemIcon from "@material-ui/core/ListItemIcon";
import MUIListItemText from "@material-ui/core/ListItemText";
import { PrimaryColor, ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";

interface DrawerItemProps {
  label: string;
  path: string;
  icon: JSX.Element;
}

const ItemActiveStyle = css`
  span {
    color: ${ProjectPalette.primary.main};
    font-weight: 500;
  }
`;
const ItemInActiveStyle = css`
  span {
    color: ${PrimaryColor[2]};
    font-weight: bold;
    font-size: 18px;
  }
`;

const ItemIconActiveStyle = css`
  svg {
    color: ${ProjectPalette.primary.main};
    min-width: initial;
    margin-right: 16px;
    font-size: 25px;
  }
`;
const ItemIconInActiveStyle = css`
  svg {
    color: ${ProjectPalette.text.primary};
    min-width: initial;
    margin-right: 16px;
    font-size: 25px;
  }
`;

export const DrawerItem = (props: DrawerItemProps) => {
  const [activeState, setNavLinkState] = useState(false);

  return (
    <NavLink
      to={props.path}
      exact
      isActive={(match) => {
        if (!match) {
          setNavLinkState(false);
        } else {
          setNavLinkState(true);
        }
      }}
    >
      <MUIListItem
        button
        key={props.label}
        css={`
          &:hover {
            background-color: initial;
          }
        `}
      >
        {/*<MUIListItemIcon
          css={activeState ? ItemIconActiveStyle : ItemIconInActiveStyle}
        >
          {props.icon}
        </MUIListItemIcon>*/}
        <MUIListItemText
          // eslint-disable-next-line sonarjs/no-all-duplicated-branches
          css={ItemInActiveStyle}
          primary={props.label}
        />
      </MUIListItem>
    </NavLink>
  );
};
