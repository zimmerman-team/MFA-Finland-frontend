/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import MUIDrawer from "@material-ui/core/Drawer";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { bottomDrawerAtom } from "app/state/recoil/atoms";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { exportPage } from "app/utils/exportPage";

const style = {
  container: css`
    // height: 40vh;
    display: flex;
    padding: 12px;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    background: ${PrimaryColor[0]};
  `,
  closeIcon: css`
    display: flex;
    justify-content: flex-end;
  `,
  contentGrid: css`
    > div {
      color: #fff;
      display: flex;
      font-size: 14px;
      justify-content: center;
    }
  `,
  divider: css`
    width: 100%;
    margin: 32px 0;
    border-bottom: 1px solid #fff;
  `,
  downloadButton: css`
    width: 60px;
    height: 60px;
    display: flex;
    font-size: 16px;
    background: #fff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: ${PrimaryColor[0]};
  `,
};

export const MdBottomMenu = () => {
  const url = window.location.href;
  //   const url = "https://data.mfa.fi";
  const title = "MFA IATI data portal";
  const [drawerState, setDrawerState] = useRecoilState(bottomDrawerAtom);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  return (
    <MUIDrawer anchor="bottom" open={drawerState} onClose={toggleDrawer(false)}>
      <Grid container css={style.container}>
        <Grid item xs={12} md={12} lg={12} css={style.closeIcon}>
          <IconButton
            aria-label="cancel"
            onClick={toggleDrawer(false)}
            css={`
              color: ${PrimaryColor[2]};
            `}
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          item
          xs={10}
          sm={8}
          md={6}
          lg={6}
          css={style.contentGrid}
        >
          <Grid item xs={12} md={12} lg={12}>
            Share
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <div css="width: 100%; height: 32px;" />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={60} round />
            </FacebookShareButton>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={60} round />
            </LinkedinShareButton>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon size={60} round />
            </TwitterShareButton>
          </Grid>
          <Grid item xs={12} css={style.divider} />
          <Grid item xs={12} md={12} lg={12}>
            Download
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <div css="width: 100%; height: 32px;" />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <div css={style.downloadButton} onClick={() => exportPage("png")}>
              PNG
            </div>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <div css={style.downloadButton} onClick={() => exportPage("pdf")}>
              PDF
            </div>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <div css={style.downloadButton} onClick={() => exportPage("svg")}>
              SVG
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MUIDrawer>
  );
};
