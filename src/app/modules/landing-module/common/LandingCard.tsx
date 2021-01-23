import React, { FunctionComponent } from "react";
import { ProjectPalette } from "app/theme";
import { Grid, Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { css } from "styled-components/macro";

export interface LandingCardProps {
  title: string;
  tooltip?: string;
  height?: number;
  marginBottomTitle?: number;
  disbursementsStatComponent?: FunctionComponent;
}

const createStyles = (props: LandingCardProps) => {
  return {
    container: css`
      padding: 24px 32px 32px 32px;
      background-color: ${ProjectPalette.common.white};
      width: 100%;
      height: ${props.height}px;
      border-radius: 30px;
    `,
    gridContainer: css`
      margin-bottom: ${props.marginBottomTitle}px;
    `,
    textHeading: css`
      line-height: 21.6px;
      margin-right: 14px;
    `,
    infoIcon: css`
      color: #bcc6d6;
    `,
  };
};

export const LandingCard: React.FunctionComponent<LandingCardProps> = (
  props
) => {
  const { children, title, tooltip, disbursementsStatComponent } = props;
  const styles = createStyles(props);

  return (
    <div id="LandingCard-container" css={styles.container}>
      <Grid container css={styles.gridContainer}>
        <Grid container item xs={6}>
          {/* Heading */}
          <Typography variant="h6" color="secondary" css={styles.textHeading}>
            {title}
          </Typography>

          {/* Tooltip */}
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoOutlinedIcon css={styles.infoIcon} />
            </Tooltip>
          )}
        </Grid>

        {/*Optional component, intended for the disbursements card*/}
        <Grid container item xs={6}>
          {disbursementsStatComponent}
        </Grid>
      </Grid>
      {/* Children */}
      {children}
    </div>
  );
};

LandingCard.defaultProps = {
  height: 328,
};
