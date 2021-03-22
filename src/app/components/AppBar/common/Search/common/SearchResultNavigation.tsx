import React from "react";
import get from "lodash/get";
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
  padding: 15px 24px;
  align-items: flex-start;
  justify-content: flex-start;
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
