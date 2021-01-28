import React from "react";
import { css } from "styled-components/macro";
import { useRecoilState } from "recoil";
import { filterPanelOpenAtom } from "../../state/recoil/atoms";
import { Container, Grid, Typography } from "@material-ui/core";
import { ArrowForwardIos, Cancel, Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core/";
import { PillButton } from "../Buttons/PillButton";
import { ProjectPalette, SecondaryColor } from "../../theme";
import { createStyles } from "./styles";
import { data } from "./data";
import { FilterCategoryOption } from "./common/FilterCategoryOption";

export interface FilterPanelProps {}

export const FilterPanel = (props: FilterPanelProps) => {
  const styles = createStyles(props);
  const [filterPanelOpen, setFilterPanelOpen] = useRecoilState(
    filterPanelOpenAtom
  );
  React.useEffect(() => {}, []);

  return (
    <>
      {filterPanelOpen && (
        <div css={styles.container}>
          <Container maxWidth="lg" css={styles.muiContainer}>
            <Grid
              container
              item
              justify="space-between"
              alignItems="flex-start"
            >
              <Typography variant="h5" css={styles.heading}>
                Add Filters
              </Typography>
              <IconButton
                css={styles.closeContainer}
                onClick={() => setFilterPanelOpen(false)}
              >
                <Cancel css={styles.closeIcon} />
              </IconButton>
            </Grid>

            <Grid container item>
              <Grid item xs={5}>
                {data.map((option, index) => {
                  return index < 4 && <FilterCategoryOption {...option} />;
                })}
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={5}>
                {data.map((option, index) => {
                  return index >= 4 && <FilterCategoryOption {...option} />;
                })}
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
              <PillButton variant="text" css={styles.secondaryButton}>
                Reset filters
              </PillButton>
              <PillButton css={styles.primaryButton}>Apply</PillButton>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};
