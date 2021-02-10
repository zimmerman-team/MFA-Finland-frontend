import React from "react";
import { css } from "styled-components/macro";
import { Grid, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { currentFilterOpenAtom } from "../../../state/recoil/atoms";
import { Header } from "../Card/Header";
import { Card, FilterOption } from "../Card";
import { BottomActions } from "../Card/BottomActions";

export interface FilterProps {
  title: string;
  data?: FilterOption[];
  renderSearch?: boolean;
}

export const createStyles = (props: FilterProps) => {
  return {
    container: css``,
    selected: css`
      margin-left: 104px;
      color: white;
      font-size: 12px;
      line-height: 14px;
      font-weight: 400;
      margin-top: 8px;
      margin-bottom: 2px;
    `,
    bottomActionsContainer: css`
      display: flex;
      justify-content: flex-end;
      max-width: ${props.title === "Period" ? "712px" : "920px"};
    `,
  };
};

export const Filter = (props: FilterProps) => {
  const styles = createStyles(props);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);

  function formatSelectedValues() {
    return "0 Sector categories, 0 sector sub categories, 0 sectors are selected";
  }

  return (
    <Grid container item direction="column" css={styles.container}>
      <Header {...props} />
      <Card {...props} />
      {props.title !== "Period" && (
        <Typography variant="caption" css={styles.selected}>
          {formatSelectedValues()}
        </Typography>
      )}
      <div css={styles.bottomActionsContainer}>
        <BottomActions {...props} />
      </div>
    </Grid>
  );
};
