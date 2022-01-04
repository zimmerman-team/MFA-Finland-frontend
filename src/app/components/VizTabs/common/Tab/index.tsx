import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { languageAtom } from "app/state/recoil/atoms";
import { TabProps } from "app/components/VizTabs/data";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";

const tabcss = (active: boolean) => css`
  height: 35px;
  transition: background 0.2s ease-in-out;
  background: ${active ? PrimaryColor[0] : SecondaryColor[1]};
  display: flex;
  align-items: center;
  margin-right: 1px;

  :first-of-type {
    border-radius: 15px 0px 0px 0px;
  }

  :last-of-type {
    border-right-style: none;
    border-radius: 0px 15px 0px 0px;
  }

  &:hover {
    color: #fff;
    background: ${PrimaryColor[3]};
  }

  a {
    color: ${active ? "#fff" : PrimaryColor[0]};
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
  }
`;

export function RouteTab(props: TabProps) {
  const location = useLocation();
  const { params } = useRouteMatch();
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <li css={tabcss(get(params, "tab", "") === props.url.split("/")[2])}>
      <NavLink
        to={`/${currentLanguage === "se" ? "sv" : currentLanguage}${props.url}${
          location.search
        }`}
      >
        {props.cmsKey ? get(cmsData, props.cmsKey, props.name) : props.name}
      </NavLink>
    </li>
  );
}
