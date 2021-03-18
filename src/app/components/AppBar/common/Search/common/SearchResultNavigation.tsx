import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { SearchResultNavItem } from "app/components/AppBar/common/Search/common/SearchResultNavItem";
import {
  searchNavItems,
  NavResultsModel,
} from "app/components/AppBar/common/Search/data";

type Props = {
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

export const SearchResultNavigation = (props: Props) => (
  <div css={containercss} data-cy="search-result-navigation">
    {(!props.noAll ? searchNavItems : searchNavItems.slice(0, 5)).map(
      (navItem: string, index: number) => {
        return (
          <SearchResultNavItem
            index={index}
            name={navItem}
            key={`search-nav-item-${index}`}
            active={props.activeTab === navItem}
            onClick={() => props.onChange(navItem)}
            count={get(props.results, `[${navItem}]`, []).count}
          />
        );
      }
    )}
  </div>
);
