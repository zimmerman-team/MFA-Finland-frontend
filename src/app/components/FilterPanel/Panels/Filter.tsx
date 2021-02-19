import React from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-components/macro";
import { Grid, Typography } from "@material-ui/core";
import { Card } from "app/components/FilterPanel/Card";
import { FilterProps } from "app/components/FilterPanel/data";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { Header } from "app/components/FilterPanel/Card/Header";
import { BottomActions } from "app/components/FilterPanel/Card/BottomActions";

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
    return props.selection.join(" ");
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
        <BottomActions
          onApply={props.onApplyFilters}
          onReset={props.onApplyFilters}
        />
      </div>
    </Grid>
  );
};
