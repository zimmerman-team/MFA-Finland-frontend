import React from "react";
import { useRecoilState } from "recoil";
import { Cancel } from "@material-ui/icons";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { createStyles } from "app/components/FilterPanel/styles";
import { BottomActions } from "app/components/FilterPanel/Card/BottomActions";
import {
  FILTER_TYPES,
  MailPanelInitDataItemModel,
} from "app/components/FilterPanel/data";
import { ChooseAFilterListItem } from "app/components/FilterPanel/ListItems/ChooseAFilterListItem";

interface Model {
  onApplyFilters: () => void;
  onResetFilters: () => void;
  data: MailPanelInitDataItemModel[];
}

export const ChooseAFilterPanel = (props: Model) => {
  const styles = createStyles(props);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);

  return (
    <>
      <Grid container item justify="space-between" alignItems="flex-start">
        <Typography variant="h5" css={styles.heading}>
          Add Filters
        </Typography>
        <IconButton
          css={styles.closeContainer}
          onClick={() => setCurrentFilterOpen(FILTER_TYPES.NONE)}
        >
          <Cancel css={styles.closeIcon} />
        </IconButton>
      </Grid>

      <Grid container item>
        <Grid item xs={5}>
          {props.data.map(
            (option: MailPanelInitDataItemModel, index: number) => {
              return (
                index < 4 && (
                  <ChooseAFilterListItem key={option.label} {...option} />
                )
              );
            }
          )}
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={5}>
          {props.data.map(
            (option: MailPanelInitDataItemModel, index: number) => {
              return (
                index >= 4 && (
                  <ChooseAFilterListItem key={option.label} {...option} />
                )
              );
            }
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid
        container
        item
        xs={11}
        justify="flex-end"
        css={styles.actionContainer}
      >
        <BottomActions
          onApply={props.onApplyFilters}
          onReset={props.onResetFilters}
        />
      </Grid>
    </>
  );
};
