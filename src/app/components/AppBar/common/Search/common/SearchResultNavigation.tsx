import React from "react";
import get from "lodash/get";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { SearchResultNavItem } from "app/components/AppBar/common/Search/common/SearchResultNavItem";
import {
  searchNavItems,
  NavResultsModel,
} from "app/components/AppBar/common/Search/data";

type Props = {
  cmsData: any;
  noAll?: boolean;
  activeTab: string;
  onChange: Function;
  results: NavResultsModel;
};

const containercss = css`
  display: flex;
  padding: 15px 10px;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
      background: #ededf6;
    }

    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background: #ededf6;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #2e4063;
    }
  }
`;

export const SearchResultNavigation = (props: Props) => {
  return (
    <div css={containercss} data-cy="search-result-navigation">
      {(!props.noAll ? searchNavItems : searchNavItems.slice(0, 5)).map(
        (navItem: any, index: number) => {
          return (
            <SearchResultNavItem
              index={index}
              key={`search-nav-item-${index}`}
              active={props.activeTab === navItem}
              onClick={() => props.onChange(navItem.name)}
              name={get(props.cmsData, navItem.cmsKey, navItem.name)}
              count={get(props.results, `[${navItem.name}]`, []).count}
            />
          );
        }
      )}
    </div>
  );
};
