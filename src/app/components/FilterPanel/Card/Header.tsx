import { useRecoilState } from "recoil";
import { currentFilterOpenAtom } from "../../../state/recoil/atoms";
import { css } from "styled-components/macro";
import { IconButton, Typography } from "@material-ui/core";
import { FILTER_TYPES } from "../data";
import { ArrowBackIos } from "@material-ui/icons";
import { SearchPlaceholder } from "../../AppBar";
import React from "react";

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
    `,
    backButton: css`
      margin-top: -12px;
      margin-left: -12px;
      margin-right: 68px;
      height: max-content;
    `,
    rightSideContainer: css`
      width: 100%;
    `,
    subtitle: css`
      color: white;
      line-height: 22px;
      margin-bottom: ${title == "Period" ? "10px" : "7px"};
    `,
    titleContainer: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    title: css`
      color: white;
      line-height: 22px;
    `,
  };
};

export const Header = (props: HeaderProps) => {
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const styles = createStyles(props.title);

  return (
    <div css={styles.container}>
      <IconButton
        css={styles.backButton}
        onClick={() => setCurrentFilterOpen(FILTER_TYPES.MAIN)}
      >
        <ArrowBackIos style={{ color: "white" }} />
      </IconButton>

      <div css={styles.rightSideContainer}>
        <Typography variant="h6" css={styles.subtitle}>
          Add Filter
        </Typography>
        <div css={styles.titleContainer}>
          <Typography variant="h5" css={styles.title}>
            {props.title}
          </Typography>
          {props.renderSearch && <SearchPlaceholder />}
        </div>
      </div>
    </div>
  );
};
