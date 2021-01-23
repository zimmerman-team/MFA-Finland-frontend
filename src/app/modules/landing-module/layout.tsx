import React from "react";
import { Container, Grid, Hidden } from "@material-ui/core";
import { OverviewDisbursements } from "./fragments/OverviewDisbursements";
import { ThematicAreas } from "./fragments/ThematicAreas";
import { Result } from "./fragments/Result";
import { Regions } from "./fragments/Regions";
import { Organisations } from "./fragments/Organisations";
import { BudgetLines } from "./fragments/BudgetLines";
import { Sdgs } from "./fragments/Sdgs";
import { About } from "./fragments/About";
import { Map } from "./fragments/Map";
import { css } from "styled-components/macro";

export const LandingLayout = () => {
  const styles = {
    container: css`
      padding-top: 24px;
      padding-bottom: 211px;
      background-color: #f8f8f8;
    `,
    background: css`
      width: 100%;
      background-color: #f8f8f8;
    `,
  };

  return (
    <div id="Landing-background" css={styles.background}>
      <Container maxWidth={"lg"} css={styles.container}>
        <Grid container spacing={2}>
          {/* ROW 1 on lg*/}
          <Grid item lg={8} sm={12} xs={12}>
            <OverviewDisbursements />
          </Grid>

          <Grid item lg={4} sm={12} xs={12}>
            <ThematicAreas />
          </Grid>

          {/* ROW 2 on lg */}
          <Grid item lg={4} sm={12} xs={12}>
            <Result />
          </Grid>

          <Grid item lg={4} sm={12} xs={12}>
            <Regions />
          </Grid>

          <Grid item lg={4} sm={12} xs={12}>
            <Organisations />
          </Grid>

          {/* ROW 3 on lg */}
          <Grid item lg={8} sm={12} xs={12}>
            <BudgetLines />
          </Grid>

          <Grid item lg={4} sm={12} xs={12}>
            <Result />
          </Grid>

          {/* ROW 4 on lg */}
          <Grid item lg={8} sm={12} xs={12}>
            <Sdgs />
          </Grid>

          <Grid item lg={4} sm={12} xs={12}>
            <About />
          </Grid>

          {/* ROW 5 on lg */}
          <Hidden smDown>
            <Grid item lg={12} sm={12} xs={12}>
              <Map />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
};
