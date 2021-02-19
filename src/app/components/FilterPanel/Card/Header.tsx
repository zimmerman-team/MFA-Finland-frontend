import { useRecoilState } from "recoil";

import { css } from "styled-components/macro";
import { Hidden, IconButton, Typography } from "@material-ui/core";

import { ArrowBackIos } from "@material-ui/icons";

import React from "react";
import { SearchPlaceholder } from "app/components/AppBar/sort/SearchPlaceholder";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { FILTER_TYPES } from "app/components/FilterPanel/data";

interface HeaderProps {
  title: string;
  renderSearch?: boolean;
}

const createStyles = (title: string) => {
  return {
    container: css`
      display: flex;
      max-width: 920px;
      margin-bottom: 16px;

      @media (max-width: 600px) {
        max-width: initial;
        flex-direction: column;
      }
    `,
    backButton: css`
      margin-top: -12px;
      margin-left: -12px;
      margin-right: 68px;
      height: max-content;

      @media (max-width: 600px) {
        margin-right: initial;
      }
    `,
    rightSideContainer: css`
      width: 100%;
      display: flex;

      @media (max-width: 600px) {
        align-items: center;
      }
      //flex-direction: column;
      //flex-wrap: wrap;
    `,
    subtitle: css`
      color: white;
      line-height: 22px;
      margin-bottom: ${title == "Period" ? "10px" : "7px"};

      @media (max-width: 600px) {
        width: 100%;
        font-size: 14px;
        margin-bottom: 0;
      }
    `,
    titleContainer: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 600px) {
        width: 100%;
        flex-wrap: wrap;
      }
    `,
    title: css`
      color: white;
      line-height: 22px;
      @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 16px;
        font-size: 14px;
      }
    `,
  };
};

export const Header = (props: HeaderProps) => {
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const styles = createStyles(props.title);

  return (
    <div css={styles.container}>
      <div css={styles.rightSideContainer}>
        <IconButton
          css={styles.backButton}
          onClick={() => setCurrentFilterOpen(FILTER_TYPES.MAIN)}
        >
          <ArrowBackIos style={{ color: "white" }} />
        </IconButton>

        <div>
          <Typography variant="h6" css={styles.subtitle}>
            Add Filter
          </Typography>
          <Typography variant="h5" css={styles.title}>
            {props.title}
          </Typography>
        </div>
      </div>
      {props.renderSearch && <SearchPlaceholder />}
    </div>
  );
};
