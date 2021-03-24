import React from "react";
import { useRecoilState } from "recoil";
import { searchFocusAtom } from "app/state/recoil/atoms";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { containercss } from "app/components/AppBar/common/Search/style";
import { SearchField } from "app/components/AppBar/common/Search/common/SearchField";
import { SearchComponentLayoutProps } from "app/components/AppBar/common/Search/data";
import { SearchResults } from "app/components/AppBar/common/Search/common/SearchResults";

export function SearchComponentLayout(props: SearchComponentLayoutProps) {
  const [isFocused, setIsFocused] = useRecoilState(searchFocusAtom);
  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={props.onClickAway}>
      <div ref={props.targetRef} css={containercss}>
        <SearchField
          value={props.value}
          isFocused={isFocused}
          cmsData={props.cmsData}
          setValue={props.setValue}
          setIsFocused={setIsFocused}
        />
        {props.value.length > 3 && (
          <SearchResults
            width={props.width}
            cmsData={props.cmsData}
            loading={props.loading}
            results={props.searchData}
            resultType={props.resultType}
            handleLoadMore={props.loadMore}
            handleResultClick={props.close}
            hasMoreOfType={props.hasMoreOfType}
            changeResultType={props.setResultType}
          />
        )}
      </div>
    </ClickAwayListener>
  );
}
