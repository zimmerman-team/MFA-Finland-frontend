/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { PrimaryColor } from "app/theme";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { exportPage } from "app/utils/exportPage";
import get from "lodash/get";

const containercss = css`
  padding: 8px;
  width: 250px;
  display: flex;
  color: #2e4982;
  font-size: 14px;
  background: #fff;
  flex-direction: column;
`;

const iconscontainercss = css`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
`;

const downloadButton = css`
  width: 38px;
  color: #fff;
  height: 38px;
  display: flex;
  font-size: 16px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${PrimaryColor[0]};

  &:hover {
    cursor: pointer;
    background: #fff;
    color: ${PrimaryColor[0]};
    border: 1px solid ${PrimaryColor[0]};
  }
`;

export function ExportTooltip(cmsData: any) {
  return (
    <div css={containercss}>
      <Typography variant="body2">
        {get(cmsData.cmsData, "tooltips.download_button", "Download")}
      </Typography>
      <Grid container css={iconscontainercss}>
        <Grid item xs={3}>
          <div css={downloadButton} onClick={() => exportPage("png")}>
            PNG
          </div>
        </Grid>
        <Grid item xs={3}>
          <div css={downloadButton} onClick={() => exportPage("pdf")}>
            PDF
          </div>
        </Grid>
        <Grid item xs={3}>
          <div css={downloadButton} onClick={() => exportPage("svg")}>
            SVG
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
