/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { css } from "styled-components/macro";
import { languageAtom } from "app/state/recoil/atoms";

interface ResultItemParams {
  text: string;
  link: string;
  index?: number;
  handleResultClick: any;
}

const containercss = css`
  margin: 8px 0;
  display: flex;
  cursor: pointer;
  line-height: 24px;
  padding-left: 24px;
  padding-right: 24px;
  align-items: center;
  justify-content: space-between;
  transition: background 0.1s linear;

  &:hover {
    background: #ededf6;
    > a {
      color: #2e4063;
      background: #ededf6;
      text-decoration: none;
    }
  }
`;

const linkcss = css`
  width: 100%;
  color: #2e4063;
  font-size: 12px;
  background: #fff;
  text-decoration: none;
  transition: background 0.1s linear;
`;

export const SearchResultItem = (props: ResultItemParams) => {
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <div
      css={containercss}
      onClick={props.handleResultClick}
      data-cy={`search-result-item-${props.index}`}
    >
      <Link css={linkcss} to={`/${currentLanguage}${props.link}`}>
        {props.text}
      </Link>
    </div>
  );
};
