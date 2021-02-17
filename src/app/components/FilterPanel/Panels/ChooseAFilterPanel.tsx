import React from "react";
import { FilterPanelProps } from "../index";
import { Grid, Hidden, IconButton, Typography } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { data, FILTER_TYPES } from "../data";
import { useRecoilState } from "recoil";
import { createStyles } from "../styles";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { BottomActions } from "../Card/BottomActions";
import { ChooseAFilterListItem } from "../ListItems/ChooseAFilterListItem";

export const ChooseAFilterPanel = (props: FilterPanelProps) => {
  const styles = createStyles(props);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);

  return (
    <>
      {/* ------------------------------------ */}
      {/* filter selection header */}
      <Grid
        container
        item
        xs={12}
        lg={12}
        justify="space-between"
        alignItems="flex-start"
      >
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

      {/* ------------------------------------ */}
      {/* filter options */}
      <Grid container item xs={12} lg={12}>
        <Grid item xs={12} lg={5}>
          {data.map((option, index) => {
            return index < 4 && <ChooseAFilterListItem {...option} />;
          })}
        </Grid>

        <Hidden smDown>
          <Grid item lg={1} />
        </Hidden>

        <Grid item xs={12} lg={5}>
          {data.map((option, index) => {
            return index >= 4 && <ChooseAFilterListItem {...option} />;
          })}
        </Grid>
        <Grid item xs={1} />
      </Grid>

      {/* ------------------------------------ */}
      {/* selection actions */}
      <Grid
        container
        item
        xs={12}
        lg={11}
        justify="flex-end"
        css={styles.actionContainer}
      >
        <BottomActions />
      </Grid>
    </>
  );
};
