import React from "react";
import get from "lodash/get";
import { Cancel } from "@material-ui/icons";
import { useCMSData } from "app/hooks/useCMSData";
import { createStyles } from "app/components/FilterPanel/styles";
import { Grid, Hidden, IconButton, Typography } from "@material-ui/core";
import { BottomActions } from "app/components/FilterPanel/Card/BottomActions";
import { MailPanelInitDataItemModel } from "app/components/FilterPanel/data";
import { ChooseAFilterListItem } from "app/components/FilterPanel/ListItems/ChooseAFilterListItem";

interface Model {
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onCloseBtnClick: () => void;
  data: MailPanelInitDataItemModel[];
}

export const ChooseAFilterPanel = (props: Model) => {
  const styles = createStyles(props);
  const cmsData = useCMSData({ returnData: true });

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
          {get(cmsData, "filters.addfilters", "Add Filters")}
        </Typography>
        <IconButton css={styles.closeContainer} onClick={props.onCloseBtnClick}>
          <Cancel css={styles.closeIcon} />
        </IconButton>
      </Grid>

      <Grid container item xs={12} lg={12}>
        <Grid item xs={12} lg={5}>
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

        <Hidden smDown>
          <Grid item lg={1} />
        </Hidden>

        <Grid item xs={12} lg={5}>
          {props.data.map(
            (option: MailPanelInitDataItemModel, index: number) => {
              return (
                index >= 4 && (
                  <ChooseAFilterListItem key={option.label} {...option} />
                )
              );
            }
          )}
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
          <BottomActions
            onApply={props.onApplyFilters}
            onReset={props.onResetFilters}
          />
        </Grid>
      </Grid>
    </>
  );
};
