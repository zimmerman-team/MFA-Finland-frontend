import React, { useState } from "react";
import get from "lodash/get";
import { NavLink } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import MUIListItem from "@material-ui/core/ListItem";
import MUIListItemText from "@material-ui/core/ListItemText";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

interface DrawerItemProps {
  label: string;
  path: string;
}

const ItemInActiveStyle = css`
  span {
    color: ${PrimaryColor[2]};
    font-weight: bold;
    font-size: 18px;
  }
`;

export const DrawerItem = (props: DrawerItemProps) => {
  const cmsData = useCMSData({ returnData: true });
  const [activeState, setNavLinkState] = useState(false);
  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);
  const mobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage((event.target as HTMLInputElement).value);
  };

  const radiocss = css`
    padding-top: 10px;
    padding-left: 16px;
    * {
      color: white;
    }
  `;

  return mobile && props.label === "Language" ? (
    <MUIListItem
      // button
      key={props.label}
      css={`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        @media (max-width: 960px) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        &:hover {
          background-color: initial;
        }
      `}
    >
      <MUIListItemText
        css={ItemInActiveStyle}
        primary={get(cmsData, `menu.${props.label.toLowerCase()}`, props.label)}
      />
      <RadioGroup
        css={radiocss}
        aria-label="Select a language"
        name="select-language-mobile"
        color="primary"
        value={currentLanguage}
        onChange={handleChange}
      >
        <FormControlLabel value="en" control={<Radio />} label="English" />
        <FormControlLabel value="fi" control={<Radio />} label="Finnish" />
      </RadioGroup>
    </MUIListItem>
  ) : (
    <NavLink
      to={props.path}
      exact
      isActive={(match) => {
        if (!match) {
          setNavLinkState(false);
          return false;
        }
        setNavLinkState(true);
        return true;
      }}
    >
      <MUIListItem
        button
        key={props.label}
        css={`
          @media (max-width: 960px) {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          &:hover {
            background-color: initial;
          }
        `}
      >
        <MUIListItemText
          css={ItemInActiveStyle}
          primary={get(
            cmsData,
            `menu.${props.label.toLowerCase()}`,
            props.label
          )}
        />
      </MUIListItem>
    </NavLink>
  );
};
