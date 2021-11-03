/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { css } from "styled-components/macro";
import { getName } from "app/components/Charts/sdg";
import { languageAtom } from "app/state/recoil/atoms";
import { TriangleIcon } from "app/assets/TriangleIcon";
import LinearProgress from "@material-ui/core/LinearProgress";
import { linearprogresscss } from "app/components/AppBar/common/Search/style";
import { SearchResultItem } from "app/components/AppBar/common/Search/common/SearchResultItem";
import { SearchResultNavigation } from "app/components/AppBar/common/Search/common/SearchResultNavigation";
import {
  ResultModel,
  NavResultsModel,
} from "app/components/AppBar/common/Search/data";

interface SearchResultsProps {
  cmsData: any;
  width: number;
  value: string;
  loading: boolean;
  close: () => void;
  resultType: string;
  hasMoreOfType: boolean;
  handleResultClick: any;
  handleLoadMore: Function;
  results: NavResultsModel;
  changeResultType: Function;
}

const containercss = css`
  top: 40px;
  width: 600px;
  z-index: 300;
  display: flex;
  position: absolute;
  border-radius: 16px;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.12);

  @media (max-width: 992px) {
    width: calc(100vw - 135px);
  }
  @media (max-width: 600px) {
    width: calc(100vw - 32px);
  }
`;

const projectslinkcss = css`
  width: 100%;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;

  @media (max-width: 600px) {
    padding: 12px 0;
    justify-content: center;
  }
`;

const resultscss = css`
  width: 100%;
  overflow-y: auto;
  max-height: 338px;

  @media (max-width: 600px) {
    width: calc(100vw - 32px);
  }

  &::-webkit-scrollbar {
    width: 6px;
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
`;

const loadmorecss = css`
  width: 100%;
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;

  &:hover {
    cursor: pointer;
    background-color: #ededf6;
  }
`;

export const SearchResults = (props: SearchResultsProps) => {
  const [currentLanguage] = useRecoilState(languageAtom);
  const renderedResults = get(props.results, `[${props.resultType}].data`, []);
  return (
    <div css={containercss} data-cy="search-result">
      <SearchResultNavigation
        results={props.results}
        cmsData={props.cmsData}
        activeTab={props.resultType}
        onChange={props.changeResultType}
      />
      <div css={linearprogresscss(600, props.loading)}>
        <LinearProgress />
      </div>
      {props.resultType === "Projects" && renderedResults.length > 0 && (
        <div css={projectslinkcss}>
          <Link
            to="/viz/projects"
            onClick={() => {
              sessionStorage.setItem("searchValue", props.value);
              props.close();
            }}
          >
            Go to projects list
          </Link>
        </div>
      )}
      <div css={resultscss}>
        {renderedResults.map((resultItem: ResultModel, index: number) => (
          <SearchResultItem
            index={index}
            link={resultItem.link}
            key={`search-result-item-${index}`}
            handleResultClick={props.handleResultClick}
            text={resultItem[getName(currentLanguage)] || resultItem.name}
          />
        ))}
      </div>
      {props.hasMoreOfType && renderedResults.length > 0 && (
        <div css={loadmorecss} onClick={() => props.handleLoadMore()}>
          <TriangleIcon />
        </div>
      )}
    </div>
  );
};
